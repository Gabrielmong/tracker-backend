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
      skip: args.skip,
      take: args.take,
      orderBy: {
        // newest first
        date: 'desc',
      },
    });
  },
  transaction: async (parent, args) => {
    const transaction = await Prisma.transaction.findUnique({
      where: {
        id: args.id,
      },
      include: {
        account: true,
        user: true,
      },
    });

    console.log(transaction);

    return transaction;
  },
  transactionsCount: async (parent, args) => {
    return await Prisma.transaction.count({
      where: {
        userId: args.userId,
      },
    });
  },
};
