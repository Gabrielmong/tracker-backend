import { Prisma } from '..';

export const accountQueries = {
  accounts: async () => {
    return await Prisma.account.findMany();
  },
  account: async (parent, args) => {
    return await Prisma.account.findUnique({
      where: {
        id: args.id,
      },
    });
  },
};
