import { gql } from 'graphql-tag';
import {
  accountType,
  accountTypeMutations,
  accountTypeQueries,
  accountTypeSubscriptions,
  transactionType,
  transactionTypeMutations,
  transactionTypeQueries,
  transactionTypeSubscriptions,
  userType,
  userTypeMutations,
  userTypeQueries,
} from '../graphql';

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
