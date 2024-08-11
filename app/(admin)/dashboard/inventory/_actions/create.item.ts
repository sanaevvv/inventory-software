'use server';

import prisma from '@/lib/prisma';
import { itemSchema, ItemSchemaType } from '@/lib/schema';
import { revalidatePath } from 'next/cache';

export async function createItem(data: ItemSchemaType) {
  const result = itemSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.format(),
      message: 'データの形式が正しくありません。入力データを確認してください。',
    };
  }

  try {
    const item = await prisma.item.create({
      data: {
        title: result.data.title,
        description: result.data.description,
        sku: result.data.sku,
        barcode: result.data.barcode,
        qty: result.data.qty,
        sellingPrice: result.data.sellingPrice,
        buyingPrice: result.data.buyingPrice,
        reOrderPoint: result.data.reOrderPoint,
        imageUrl: result.data.imageUrl,
        weight: result.data.weight,
        dimensions: result.data.dimensions,
        taxRate: result.data.taxRate,
        notes: result.data.notes,
        warehouse: {
          connect: {
            name: result.data.warehouse,
          },
        },
        category: {
          connect: {
            title: result.data.category,
          },
        },
        unit: {
          connect: {
            title: result.data.unit,
          },
        },
        brand: {
          connect: {
            brandname: result.data.brand,
          },
        },
        supplier: {
          connect: {
            name: result.data.supplier,
          },
        },
      },
    });

    revalidatePath('/dashboard/inventory/items');

    return {
      message: `${item.title}'が正常に作成されました`,
      success: true,
      data: item,
    };
  } catch (error) {
    return {
      message: `${data.title}の作成に失敗しました`,
      success: false,
      errors: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}


export async function updateItem(data: ItemSchemaType) {
  const result = itemSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.format(),
      message: 'データの形式が正しくありません。入力データを確認してください。',
    };
  }

  try {
    const updateItem = await prisma.item.update({
      where: {
        id: data.id,
      },
      data: {
        title: result.data.title,
        description: result.data.description,
        sku: result.data.sku,
        barcode: result.data.barcode,
        qty: result.data.qty,
        buyingPrice: result.data.buyingPrice,
        sellingPrice: result.data.sellingPrice,
        reOrderPoint: result.data.reOrderPoint,
        imageUrl: result.data.imageUrl,
        dimensions: result.data.dimensions,
        taxRate: result.data.taxRate,
        notes: result.data.notes,
        weight: result.data.weight,

        warehouse: {
          connect: {
            name: result.data.warehouse,
          },
        },
        category: {
          connect: {
            title: result.data.category,
          },
        },
        unit: {
          connect: {
            title: result.data.unit,
          },
        },
        brand: {
          connect: {
            brandname: result.data.brand,
          },
        },
        supplier: {
          connect: {
            name: result.data.supplier,
          },
        },
      },
    });

    revalidatePath('/dashboard/inventory/items');

    return {
      message: `${updateItem.title}が正常に更新されました`,
      success: true,
      data: updateItem,
    };
  } catch (error) {
    return {
      message: `${data.title}の更新に失敗しました`,
      success: false,
      errors: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function deleteItem(id: number) {
  try {
    const deleteItem = await prisma.item.delete({
      where: { id },
    });

    revalidatePath('/dashboard/inventory/items');

    return {
      message: `${deleteItem.title}が正常に削除されました`,
      success: true,
    };
  } catch (error) {
    return {
      message: `${id}の更新に失敗しました`,
      success: false,
      errors: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
