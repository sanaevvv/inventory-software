'use server';

import { categorySchema, CategorySchemaType } from '@/lib/schema';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createCategory(data: CategorySchemaType) {
  const result = categorySchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors,
    };
  }

  try {
    const newCategory = await prisma.category.create({
      data: {
        title: result.data.title,
        description: result.data.description,
      },
    });

    revalidatePath('/dashboard/inventory/categories');

    return {
      message: `${newCategory.title}が正常に作成されました`,
      success: true,
    };
  } catch (error) {
    return {
      message: `${data.title}の作成に失敗しました`,
      success: false,
      errors: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function updateCategory(data: CategorySchemaType) {
  const result = categorySchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.format(),
    };
  }

  try {
    const updatedCategory = await prisma.category.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        updatedAt: new Date(),
      },
    });

    revalidatePath('/dashboard/inventory/categories');

    return {
      success: true,
      message: `${updatedCategory.title}の更新に成功しました`,
    };
  } catch (error) {
    console.error('Failed to update category:', error);
    return {
      success: false,
      message: `${data.title}の更新に失敗しました`,
    };
  }
}

export async function deleteCategory(id: number) {
  try {
    const deletedCategory = await prisma.category.delete({
      where: { id },
    });

    revalidatePath('/dashboard/inventory/categories');

    return {
      message: `${deletedCategory.title}が正常に削除されました`,
      success: true,
    };
  } catch (error) {
    console.error('Error in deleteBrand:', error);
    return {
      message: `削除に失敗しました`,
      success: false,
      errors: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
