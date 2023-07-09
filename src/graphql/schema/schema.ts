export const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type EditBook {
    oldTitle: String
    oldAuthor: String
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(title: String, author: String): Book
    deleteBook(title: String): Book
    updateBook(
      oldTitle: String
      oldAuthor: String
      title: String
      author: String
    ): EditBook
  }
  
  type Subscription {
    bookAdded(author: String): Book  
  }
  
`;
