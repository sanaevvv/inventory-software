'use server';
import { unitSchema, UnitSchemaType } from '@/lib/schema';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createUnit(data: UnitSchemaType) {
  const result = unitSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.format(),
    };
  }

  try {
    const newUnit = await prisma.unit.create({
      data: {
        title: result.data.title,
        abbreviation: result.data.abbreviation,
      },
    });

     revalidatePath('/dashboard/inventory/units');

    return {
      message: 'ユニットが正常に作成されました',
      success: true,
      data: newUnit,
    };
  } catch (error) {
    console.error('データベースエラー:', error);
    return {
      message: 'ユニットの作成に失敗しました',
      success: false,
      errors: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function updateUnit(data: UnitSchemaType) {
  const result = unitSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors,
    };
  }

  try {
    const updateUnit = await prisma.unit.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        abbreviation: data.abbreviation
      },
    });

    revalidatePath('/dashboard/inventory/units');

    return {
      message: `${updateUnit.title}が正常に更新されました`,
      success: true,
      data: updateUnit,
    };
  } catch (error) {
    return {
      message: `${data.title}の更新に失敗しました`,
      success: false,
      errors: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function deleteUnit(id: number) {
  try {
    const deletedUnit = await prisma.unit.delete({
      where: { id },
    });

    revalidatePath('/dashboard/inventory/units');

    return {
      message: `${deletedUnit.title}が正常に削除されました`,
      success: true,
    };
  } catch (error) {
    console.error('Error in deleteUnit:', error);
    return {
      message: `削除に失敗しました`,
      success: false,
      errors: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
