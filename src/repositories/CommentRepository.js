import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createComment = async data => {
  try {
    return await prisma.comment.create({
      data: {
        content: data.content,
        commenter: {
          connect: {
            id: data.userId,
          },
        },
        PostComment: {
          connect: {
            id: data.postId,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateComment = async data => {
  try {
    return prisma.comment.update({
      where: {
        id: data.commentId,
      },
      data: {
        content: data.content,
        commenter: {
          connect: {
            id: data.userId,
          },
        },
        PostComment: {
          connect: {
            id: data.postId,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteComment = async data => {
  try {
    return await prisma.comment.delete({
      where: {
        id: data.commentId,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
