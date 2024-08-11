'use server';
import { suppliersSchema, SuppliersSchemaType } from '@/lib/schema';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createSupplier(data: SuppliersSchemaType) {
  const result = suppliersSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors,
    };
  }

  try {
    // Prismaを使用してデータベースに保存
    await prisma.supplier.create({
      data: {
        name: result.data.name,
        phone: result.data.phone,
        email: result.data.email,
        address: result.data.address,
        contactPerson: result.data.contactPerson,
        supplierCode: result.data.supplierCode,
        paymentTerms: result.data.paymentTerms,
        taxId: result.data.taxId,
        notes: result.data.notes,
      },
    });

    revalidatePath('/dashboard/inventory/suppliers')

    return {
      message: 'サプライヤーが正常に作成されました',
      success: true,
    };
  } catch (error) {
    return {
      message:  `${data.name}の作成に失敗しました`,
      success: false,
      errors: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function updateSupplier(data: SuppliersSchemaType) {
  const result = suppliersSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors,
    };
  }

  try {
    await prisma.supplier.update({
      where: {
        id: Number(data.id),
      },
      data: {
        name: result.data.name,
        phone: result.data.phone,
        email: result.data.email,
        address: result.data.address,
        contactPerson: result.data.contactPerson,
        supplierCode: result.data.supplierCode,
        paymentTerms: result.data.paymentTerms,
        taxId: result.data.taxId,
        notes: result.data.notes,
      },
    });

    revalidatePath('/dashboard/inventory/suppliers')

    return {
      message: `${result.data.name}が正常に更新されました`,
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

export async function deleteSupplier(id: number) {
  try {
    const deletedSupplier = await prisma.supplier.delete({
      where: { id },
    });

    revalidatePath('/dashboard/inventory/brands');

    return {
      message: `${deletedSupplier.name}が正常に削除されました`,
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
