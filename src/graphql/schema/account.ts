export const accountType = `
  type Account {
    balance: Float
    bank: String
    createdAt: String
    currency: String
    id: String!
    name: String
    number: String
    transactions: [Transaction]
    type: String
    updatedAt: String
    user: User
    userId: String
  }
`;

export const accountTypeQueries = `
  accounts: [Account]
  account(id: String): Account
`;

export const accountTypeMutations = `
  addAccount(
    balance: Float
    bank: String
    currency: String
    name: String
    number: String
    type: String
    userId: String
  ): Account

  updateAccount(
    balance: Float
    bank: String
    currency: String
    id: String
    name: String
    number: String
    type: String
  ): Account

  deleteAccount(id: String): Account
`;

export const accountTypeSubscriptions = `
  accountAdded(userId: String): Account
  accountUpdated(userId: String): Account
  accountDeleted(userId: String): Account
`;
