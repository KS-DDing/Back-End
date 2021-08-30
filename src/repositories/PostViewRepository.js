import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//현재 해시태그(many-to-many relation)을 못가져오는 상태
export const getAllPosts = async () => {
  try {
    return await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
        thumbnail: true,
        images: true,
        hashtags: true,
        liker: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getUserPosts = async userId => {
  try {
    console.log(userId);
    return await prisma.user.findMany({
      where: { id: userId },
      include: {
        liker: true,
        followers: true,
        followings: true,
        posts: {
          include: {
            thumbnail: true,
            hashtags: true,
            liker: true,
          },
        },
      },
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
      include: {
        liker: true,
        hashtags: true,
        images: true,
        comments: true,
        thumbnail: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
