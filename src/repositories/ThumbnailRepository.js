import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createThumbnail = async (postId, src) => {
  try {
    return prisma.thumbnail.create({
      data: {
        src,
        thumbnail_post: {
          connect: {
            id: postId,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

//이거할때 폴더에 있는애 찾아서 삭제해야한다.
export const updateThumbnail = async data => {
  try {
    return prisma.thumbnail.update({
      where: {
        id: data.imageId,
      },
      data: {
        src: data.src,
        thumbnailImage: {
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
