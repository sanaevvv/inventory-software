'use server';
import { warehouseSchema, WarehouseSchemaType } from '@/lib/schema';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

type CreateWarehouseResult = {
  success: boolean;
  message?: string;
  errors?: any;
};
export async function createWarehouse(
  data: WarehouseSchemaType
): Promise<CreateWarehouseResult> {
  const result = warehouseSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors,
    };
  }

  try {
    const newWarehouse = await prisma.warehouse.create({
      data: {
        name: result.data.name,
        location: result.data.location,
        description: result.data.description,
        warehouseType: result.data.warehouseType,
      },
    });

    revalidatePath('/dashboard/inventory/warehouses');

    return {
      message: `${newWarehouse.name}が正常に作成されました`,
      success: true,
    };
  } catch (error) {
    return {
      message: `${data.name}の作成に失敗しました`,
      success: false,
      errors: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function updateWarehouse(
  data: WarehouseSchemaType
): Promise<CreateWarehouseResult> {
  const result = warehouseSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors,
    };
  }
  try {
    const updateWarehouse = await prisma.warehouse.update({
      where: { id: Number(data.id) },
      data: {
        name: result.data.name,
        location: result.data.location,
        description: result.data.description,
        warehouseType: result.data.warehouseType,
      },
    });

    revalidatePath('/dashboard/inventory/warehouses')

    return {
      message: `${updateWarehouse.name}が正常に作成されました`,
      success: true,
    };
  } catch (error) {
    return {
      message: `${data.name}の作成に失敗しました`,
      success: false,
      errors: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function deleteWarehouse(id: number) {
  try {
    const deletedWarehouse = await prisma.warehouse.delete({
      where: { id },
    });

    revalidatePath('/dashboard/inventory/warehouses');

    return {
      message: `${deletedWarehouse.name}が正常に削除されました`,
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
