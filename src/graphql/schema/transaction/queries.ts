import { Prisma } from '../../../config';

export const transactionQueries = {
  transactions: async (parent, args) => {
    return await Prisma.transaction.findMany({
      where: {
        userId: args.userId,
      },
      include: {
        account: true,
        user: true,
      },
    });
  },
  transaction: async (parent, args) => {
    return await Prisma.transaction.findUnique({
      where: {
        id: args.id,
      },
      include: {
        account: true,
        user: true,
      },
    });
  },
};
