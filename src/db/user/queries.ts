import { Prisma } from '..';

export const userQueries = {
  users: async () => {
    return await Prisma.user.findMany({
      include: {
        accounts: true,
        transactions: true,
      },
    });
  },
  user: async (parent, args) => {
    return await Prisma.user.findUnique({
      where: {
        id: args.id,
      },
      include: {
        accounts: true,
        transactions: true,
      },
    });
  },
};
