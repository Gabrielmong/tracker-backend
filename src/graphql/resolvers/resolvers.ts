import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { PubSub, withFilter } from 'graphql-subscriptions';
import {
  userMutations,
  userQueries,
  accountMutations,
  accountQueries,
  transactionMutations,
  transactionQueries,
} from '../../db';

export const pubsub = new PubSub();

export const resolvers = {
  Query: {
    account: accountQueries.account,
    accounts: accountQueries.accounts,
    transaction: transactionQueries.transaction,
    transactions: transactionQueries.transactions,
    user: userQueries.user,
    users: userQueries.users,
  },
  Mutation: {
    addAccount: accountMutations.addAccount,
    addTransaction: transactionMutations.addTransaction,
    addUser: userMutations.addUser,
    deleteAccount: accountMutations.deleteAccount,
    deleteTransaction: transactionMutations.deleteTransaction,
    deleteUser: userMutations.deleteUser,
    updateAccount: accountMutations.updateAccount,
    updateTransaction: transactionMutations.updateTransaction,
    updateUser: userMutations.updateUser,
  },
  Subscription: {
    accountAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('ACCOUNT_ADDED'),
        (payload, variables) => {
          return payload.accountAdded.userId === variables.userId;
        },
      ),
    },
    transactionAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('TRANSACTION_ADDED'),
        (payload, variables) => {
          return payload.transactionAdded.userId === variables.userId;
        },
      ),
    },
    accountUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('ACCOUNT_UPDATED'),
        (payload, variables) => {
          return payload.accountUpdated.userId === variables.userId;
        },
      ),
    },
    transactionUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('TRANSACTION_UPDATED'),
        (payload, variables) => {
          return payload.transactionUpdated.userId === variables.userId;
        },
      ),
    },
    accountDeleted: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('ACCOUNT_DELETED'),
        (payload, variables) => {
          return payload.accountDeleted.userId === variables.userId;
        },
      ),
    },
    transactionDeleted: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('TRANSACTION_DELETED'),
        (payload, variables) => {
          return payload.transactionDeleted.userId === variables.userId;
        },
      ),
    },
  },
};
