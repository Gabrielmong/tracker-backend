export const transactionType = `
  type Transaction {
    account: Account
    accountId: String
    amount: Float
    category: String
    createdAt: String
    date: String
    description: String
    id: String!
    sentTo: String
    title: String
    type: String
    updatedAt: String
    user: User
    userId: String
  }
`;

export const transactionTypeQueries = `
    transaction(id: String): Transaction
    transactions(userId: String): [Transaction]
`;

export const transactionTypeMutations = `
  addTransaction(
    accountId: String
    amount: Float
    category: String
    date: String
    description: String
    type: String
    title: String
    userId: String
    sentTo: String
  ): Transaction
  
  deleteTransaction(id: String): Transaction

  updateTransaction(
    accountId: String
    amount: Float
    category: String
    date: String
    description: String
    id: String
    type: String
    title: String
    userId: String
    sentTo: String
  ): Transaction
`;

export const transactionTypeSubscriptions = `
  transactionAdded(userId: String): Transaction
  transactionUpdated(userId: String): Transaction
  transactionDeleted(userId: String): Transaction
`;
