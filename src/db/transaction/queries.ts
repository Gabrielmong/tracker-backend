import { Prisma } from '..';

export const transactionQueries = {
  transactions: async () => {
    return await Prisma.transaction.findMany();
  },
  transaction: async (parent, args) => {
    return await Prisma.transaction.findUnique({
      where: {
        id: args.id,
      },
    });
  },
};
