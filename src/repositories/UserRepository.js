import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const findUserById = async id => {
  try {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const findUserByEmail = async email => {
  try {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const createUser = async data => {
  try {
    return await prisma.user.create({
      data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getUsers = async () => {
  try {
    return await prisma.user.findMany({});
  } catch (err) {
    console.error(err);
  }
};
