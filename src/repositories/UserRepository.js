import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createUser = async (writer, description) => {
  return await prisma.user.create({
    data: {
      writer,
      description,
    },
  });
};
