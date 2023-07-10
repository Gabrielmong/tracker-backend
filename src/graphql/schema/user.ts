export const userType = `
  type User {
    accounts: [Account]
    createdAt: String
    email: String
    id: String!
    lastName: String
    name: String
    password: String
    transactions: [Transaction]
    updatedAt: String
  }
`;

export const userTypeQueries = `
  user(id: String): User
  users: [User]
`;

export const userTypeMutations = `
  addUser(
    email: String
    lastName: String
    name: String
    password: String
  ): User
  
  deleteUser(id: String): User
  
  updateUser(
    email: String
    id: String
    lastName: String
    name: String
    password: String
  ): User
`;
