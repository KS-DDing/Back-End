import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createPost = async data => {
  try {
    return await prisma.post.create({
      data,
    });
  } catch (err) {
    console.error(err);
  }
};
