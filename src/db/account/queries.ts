import { Prisma } from '..';

export const accountQueries = {
  accounts: async (parent, args) => {
    return await Prisma.account.findMany({
      where: {
        userId: args.userId,
      },
    });
  },
  account: async (parent, args) => {
    return await Prisma.account.findUnique({
      where: {
        id: args.id,
      },
    });
  },
};
