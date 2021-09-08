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
        postCategory: {
          connect: {
            id: data.categoryId,
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
        categoryId: data.categoryId,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

//prisma로는 삭제 잘 안되서 생 쿼리로 날림.
export const deletePost = async postId => {
  try {
    return await prisma.$queryRaw(`DELETE FROM posts WHERE id = ${postId};`);
  } catch (err) {
    console.error(err);
  }
};
