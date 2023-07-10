import { gql } from 'graphql-tag';
import {
  accountType,
  accountTypeMutations,
  accountTypeQueries,
  accountTypeSubscriptions,
} from './account';
import { userType, userTypeMutations, userTypeQueries } from './user';
import {
  transactionType,
  transactionTypeMutations,
  transactionTypeQueries,
  transactionTypeSubscriptions,
} from './transaction';

export const typeDefs = gql`  
  ${accountType}
  ${transactionType}
  ${userType}

  type Query {
    ${accountTypeQueries}
    ${transactionTypeQueries}
    ${userTypeQueries}
  }

  type Mutation {
    ${accountTypeMutations}
    ${transactionTypeMutations}
    ${userTypeMutations}
  }

  type Subscription {
    ${accountTypeSubscriptions}
    ${transactionTypeSubscriptions}
  }
`;
