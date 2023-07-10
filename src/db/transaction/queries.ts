import { Prisma } from '..';

export const transactionQueries = {
  transactions: async (parent, args) => {
    return await Prisma.transaction.findMany({
      where: {
        userId: args.userId,
      },
    });
  },
  transaction: async (parent, args) => {
    return await Prisma.transaction.findUnique({
      where: {
        id: args.id,
      },
    });
  },
};
