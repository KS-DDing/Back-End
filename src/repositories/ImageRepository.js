import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createImage = async (postId, src) => {
  try {
    return await prisma.image.create({
      data: {
        src,
        postImage: {
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

//input
//postId, src
export const updateImage = async data => {
  try {
    return await prisma.image.update({
      where: {
        id: data.postId,
      },
      data: {
        src: data.src,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

//input: id
export const deleteImage = async id => {
  try {
    return await prisma.image.update({
      where: {
        id,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
