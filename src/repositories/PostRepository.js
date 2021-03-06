import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createPost = async (userId, data) => {
  try {
    return await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const updatePost = async data => {
  try {
    return await prisma.post.update({
      where: { id: data.id },
      data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getPost = async postId => {
  try {
    return await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
