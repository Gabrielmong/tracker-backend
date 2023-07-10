import { PrismaClient } from '@prisma/client';
export { userQueries, userMutations } from './user';
export { transactionQueries, transactionMutations } from './transaction';
export { accountQueries, accountMutations } from './account';

export const Prisma = new PrismaClient();
