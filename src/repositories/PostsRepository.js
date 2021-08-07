import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllPosts = async () => {
  try {
    return await prisma.post.findMany();
  } catch (err) {
    console.error(err);
  }
};

export const getUserPosts = async userId => {
  try {
    return await prisma.user.findMany({
      where: { id: userId },
      include: {
        liker: true,
        followers: true,
        followings: true,
        posts: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
