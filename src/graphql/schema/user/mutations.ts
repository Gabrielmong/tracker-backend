import { Prisma } from '../../../config';

export const userMutations = {
  addUser: async (parent, args) => {
    return await Prisma.user.create({
      data: {
        email: args.email,
        lastName: args.lastName,
        name: args.name,
        password: args.password,
      },
      include: {
        accounts: true,
        transactions: true,
      },
    });
  },
  updateUser: async (parent, args) => {
    return await Prisma.user.update({
      where: {
        id: args.id,
      },
      data: {
        email: args.email,
        lastName: args.lastName,
        name: args.name,
        password: args.password,
      },
      include: {
        accounts: true,
        transactions: true,
      },
    });
  },
  deleteUser: async (parent, args) => {
    return await Prisma.user.delete({
      where: {
        id: args.id,
      },
    });
  },
};
