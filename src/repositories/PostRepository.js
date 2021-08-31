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

export const updatePost = async (postid, data) => {
  try {
    return await prisma.post.update({
      where: { id: postid },
      data: {
        title: data.title,
        content: data.content,
        userId: data.userId,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const deletePost = async postId => {
  try {
    return await prisma.post.delete({
      where: { id: postId },
    });
  } catch (err) {
    console.error(err);
  }
};
