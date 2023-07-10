import { Prisma } from '..';
import { pubsub } from '../../graphql';
export const accountMutations = {
  addAccount: async (parent, args) => {
    const account = await Prisma.account.create({
      data: {
        balance: args.balance,
        name: args.name,
        bank: args.bank,
        currency: args.currency,
        number: args.number,
        type: args.type,
        user: {
          connect: {
            id: args.userId,
          },
        },
      },
      select: {
        balance: true,
        bank: true,
        createdAt: true,
        currency: true,
        id: true,
        name: true,
        number: true,
        type: true,
        updatedAt: true,
        user: true,
        userId: true,
      },
    });

    pubsub.publish('ACCOUNT_ADDED', {
      accountAdded: account,
    });

    return account;
  },
  updateAccount: async (parent, args) => {
    const account = await Prisma.account.update({
      where: {
        id: args.id,
      },
      data: {
        balance: args.balance,
        name: args.name,
        bank: args.bank,
        currency: args.currency,
        number: args.number,
        type: args.type,
        user: {
          connect: {
            id: args.userId,
          },
        },
      },
      include: {
        user: true,
      },
    });

    pubsub.publish('ACCOUNT_UPDATED', {
      accountUpdated: account,
    });

    return account;
  },
  deleteAccount: async (parent, args) => {
    const account = await Prisma.account.delete({
      where: {
        id: args.id,
      },
    });

    pubsub.publish('ACCOUNT_DELETED', {
      accountDeleted: account,
    });

    return account;
  },
};
