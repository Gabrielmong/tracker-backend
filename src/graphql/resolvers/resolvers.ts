import { GraphQLError } from 'graphql';
import { books } from '../mock';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { PubSub, withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub();

export const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    addBook: (parent, args) => {
      const newBook = {
        title: args.title,
        author: args.author,
      };
      books.push(newBook);

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook });

      return newBook;
    },
    deleteBook: (parent, args) => {
      const bookIndex = books.findIndex((book) => book.title === args.title);
      if (bookIndex === -1) {
        throw new Error('Book not found');
      }
      const deletedBook = books[bookIndex];
      books.splice(bookIndex, 1);
      return deletedBook;
    },
    updateBook: (parent, args) => {
      const bookIndex = books.findIndex(
        (book) =>
          book.title === args.oldTitle && book.author === args.oldAuthor,
      );
      if (bookIndex === -1) {
        throw new GraphQLError('Book not found', {
          extensions: {
            code: ApolloServerErrorCode.PERSISTED_QUERY_NOT_FOUND,
          },
        });
      }

      const updatedBook = {
        title: args.title,
        author: args.author,
      };
      books[bookIndex] = updatedBook;

      return updatedBook;
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('BOOK_ADDED'),
        (payload, variables) => {
          return payload.bookAdded.author === variables.author;
        },
      ),
    },
  },
};
