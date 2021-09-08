import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//input: data{name, userId}
export const createCategory = async (data, userId) => {
  try {
    return await prisma.category.create({
      data: {
        name: data.name,
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

export const updateCategory = async (data, userId) => {
  try {
    return await prisma.category.update({
      where: {
        id: data.categoryId,
      },
      data: {
        name: data.name,
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

export const deleteCategory = async data => {
  try {
    return await prisma.category.delete({
      where: {
        id: data.categoryId,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
