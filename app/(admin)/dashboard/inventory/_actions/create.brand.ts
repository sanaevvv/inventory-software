'use server';

import { brandSchema, BrandSchemaType, deleteBrandSchema } from '@/lib/schema';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/dist/server/api-utils';

export async function createBrand(data: BrandSchemaType) {
  const result = brandSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors,
    };
  }

  try {
    // Prismaを使用してデータベースに保存
    const newBrand = await prisma.brand.create({
      data: {
        brandname: result.data.brandname,
      },
    });

    revalidatePath('/dashboard/inventory/brands');

    return {
      message: 'ブランドが正常に作成されました',
      success: true,
      data: newBrand,
    };
  } catch (error) {
    return {
      message: 'ブランドの作成に失敗しました',
      success: false,
      errors: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function updateBrand(data: BrandSchemaType) {
  const result = brandSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.format(),
    };
  }

  try {
    const updateBrand = await prisma.brand.update({
      where: {
        id: data.id,
      },
      data: {
        brandname: data.brandname,
      },
    });

    revalidatePath('/dashboard/inventory/brands');

    return {
      message: `${updateBrand.brandname}が正常に更新されました`,
      success: true,
      data: updateBrand,
    };
  } catch (error) {
    return {
      message: `${data.brandname}の更新に失敗しました`,
      success: false,
      errors: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function deleteBrand(id: number) {
  try {
    const deletedBrand = await prisma.brand.delete({
      where: { id },
    });

    revalidatePath('/dashboard/inventory/brands');

    return {
      message: `${deletedBrand.brandname}が正常に削除されました`,
      success: true,
      data: deletedBrand,
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
