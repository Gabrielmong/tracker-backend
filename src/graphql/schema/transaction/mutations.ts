import { pubsub, Prisma } from '../../config';
import { updateAccountBalance } from '../utils';

export const transactionMutations = {
  addTransaction: async (parent, args) => {
    const transaction = await Prisma.transaction.create({
      data: {
        amount: args.amount,
        category: args.category,
        date: new Date(args.date),
        description: args.description,
        sentTo: args.sentTo,
        title: args.title,
        type: args.type,
        account: {
          connect: {
            id: args.accountId,
          },
        },
        user: {
          connect: {
            id: args.userId,
          },
        },
      },
      include: {
        account: true,
        user: true,
      },
    });

    await updateAccountBalance(args.accountId, args.amount);

    pubsub.publish('TRANSACTION_ADDED', {
      transactionAdded: transaction,
    });

    return transaction;
  },
  updateTransaction: async (parent, args) => {
    const transaction = await Prisma.transaction.findUnique({
      where: {
        id: args.id,
      },
    });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    if (transaction.amount !== args.amount) {
      await updateAccountBalance(transaction.accountId, -transaction.amount);
      await updateAccountBalance(args.accountId, args.amount);
    }

    const updated = await Prisma.transaction.update({
      where: {
        id: args.id,
      },
      data: {
        amount: args.amount,
        category: args.category,
        date: new Date(args.date),
        description: args.description,
        sentTo: args.sentTo,
        title: args.title,
        type: args.type,
        account: {
          connect: {
            id: args.accountId,
          },
        },
        user: {
          connect: {
            id: args.userId,
          },
        },
      },
      include: {
        account: true,
        user: true,
      },
    });

    pubsub.publish('TRANSACTION_UPDATED', {
      transactionUpdated: updated,
    });

    return updated;
  },
  deleteTransaction: async (parent, args) => {
    const transaction = await Prisma.transaction.findUnique({
      where: {
        id: args.id,
      },
      include: {
        account: true,
      },
    });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    await updateAccountBalance(transaction.account.id, -transaction.amount);

    const deleted = await Prisma.transaction.delete({
      where: {
        id: args.id,
      },
    });

    pubsub.publish('TRANSACTION_DELETED', {
      transactionDeleted: deleted,
    });

    return deleted;
  },
};
