import { Prisma } from '..';

export const updateAccountBalance = async (
  accountId: string,
  amount: number,
) => {
  const account = await Prisma.account.findUnique({
    where: {
      id: accountId,
    },
  });

  if (!account) {
    throw new Error('Account not found');
  }

  const newBalance = account.balance + amount;

  return await Prisma.account.update({
    where: {
      id: accountId,
    },
    data: {
      balance: newBalance,
    },
  });
};
