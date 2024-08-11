'use server';

import {
  adjustmentAddSchema,
  AdjustmentAddSchemaType,
  adjustmentTransferSchema,
  AdjustmentTransferSchemaType,
} from '@/lib/schema';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createAdjustmentTransfer(
  data: AdjustmentTransferSchemaType
) {
  const result = adjustmentTransferSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.format(),
      message: '入力データが無効です',
    };
  }
  // 出庫元と入庫先が同じ場合のチェック
  if (result.data.givingWarehouse === result.data.receivingWarehouse) {
    return {
      success: false,
      message: '出庫元と入庫先の倉庫が同じです。異なる倉庫を選択してください。',
    };
  }

  try {
    const transferStock = await prisma.$transaction(async (prisma) => {
      // 出庫元の倉庫をマイナスする
      const updatedGivingWarehouse = await prisma.warehouse.update({
        where: {
          name: result.data.givingWarehouse,
        },
        data: {
          stockQty: {
            decrement: result.data.transferStockQty,
          },
        },
        select: {
          id: true,
          stockQty: true,
        },
      });

      if (updatedGivingWarehouse.stockQty < 0) {
        return {
          success: false,
          message: '在庫が不足しています',
        };
      }

      // 入庫先の倉庫をプラス
      const updatedReceivingWarehouse = await prisma.warehouse.update({
        where: {
          name: result.data.receivingWarehouse,
        },
        data: {
          stockQty: {
            increment: result.data.transferStockQty,
          },
        },
        select: {
          id: true,
          stockQty: true,
        },
      });

      // 在庫調整を新規作成
      const transferStock = await prisma.transferStockAdjustment.create({
        data: {
          referenceNumber: result.data.referenceNumber,
          transferStockQty: result.data.transferStockQty,
          notes: result.data.notes,
          givingWarehouse: {
            connect: {
              id: updatedGivingWarehouse.id,
            },
          },
          receivingWarehouse: {
            connect: {
              id: updatedReceivingWarehouse.id,
            },
          },
          item: {
            connect: {
              title: result.data.item,
            },
          },
        },
      });
      return {
        message: `在庫調整'${transferStock.referenceNumber}'が正常に作成されました`,
        success: true,
      };
    });

    // トランザクションの結果をチェック
    if (!transferStock.success) {
      return transferStock;
    }

    return transferStock;
  } catch (error) {
    console.error('データベースエラー:', error);
    return {
      message: `Ref.${data.referenceNumber}の在庫調整の作成に失敗しました`,
      success: false,
      errors: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function updateAdjustmentTransfer(
  data: AdjustmentTransferSchemaType
) {
  const result = adjustmentTransferSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      message: '入力データが無効です',
      errors: result.error.format(),
    };
  }

  // 出庫元と入庫先が同じ場合のチェック
  if (result.data.givingWarehouse === result.data.receivingWarehouse) {
    return {
      success: false,
      message: '出庫元と入庫先の倉庫が同じです。異なる倉庫を選択してください。',
    };
  }

  try {
    const transferUpdateTransactionResult = await prisma.$transaction(
      async (prisma) => {
        // 既存在庫を取得
        const existingTransfer =
          await prisma.transferStockAdjustment.findUnique({
            where: { id: result.data.id },
            select: {
              givingWarehouseId: true,
              receivingWarehouseId: true,
              transferStockQty: true,
              item: true,
            },
          });

        if (!existingTransfer) {
          return {
            success: false,
            message: '更新データが見つかりません',
          };
        }

        // 在庫数量の差分を計算 (新しい数量 - 古い数量)
        const qtyChange =
          result.data.transferStockQty - existingTransfer.transferStockQty;

        console.log('Operation successful:', qtyChange);

        // 出庫元の倉庫を更新
        const updatedGivingWarehouse = await prisma.warehouse.update({
          where: { id: existingTransfer.givingWarehouseId },
          data: {
            stockQty: {
              increment: qtyChange,
            },
          },
        });

        console.log('updatedGivingWarehouse', updatedGivingWarehouse);

        if (updatedGivingWarehouse.stockQty < 0) {
          return {
            success: false,
            message: '出庫倉庫の在庫が不足しています',
          };
        }

        // console.log('updatedGivingWarehouse', updatedGivingWarehouse);

        // 入庫先の倉庫を更新
        const updatedReceivingWarehouse = await prisma.warehouse.update({
          where: { id: existingTransfer.receivingWarehouseId },
          data: {
            stockQty: {
              increment: qtyChange,
            },
          },
          select: { stockQty: true },
        });

        console.log('updatedReceivingWarehouse', updatedReceivingWarehouse);

        // 在庫調整の更新
        const updateStock = await prisma.transferStockAdjustment.update({
          where: {
            id: result.data.id,
          },
          data: {
            transferStockQty: result.data.transferStockQty,
            notes: result.data.notes,
            referenceNumber: result.data.referenceNumber,
            item: {
              connect: {
                id: existingTransfer.item.id,
              },
            },
            givingWarehouse: {
              connect: {
                id: existingTransfer.givingWarehouseId,
              },
            },
            receivingWarehouse: {
              connect: {
                id: existingTransfer.receivingWarehouseId,
              },
            },
          },
        });

        console.log('Updated stock adjustment:', updateStock);
        return {
          message: `在庫調整'${updateStock.referenceNumber}'が正常に更新されました`,
          success: true,
          data: updateStock,
        };
      }
    );

    revalidatePath('/dashboard/inventory/adjustments');

    console.log('transactionResult', transferUpdateTransactionResult);
    return transferUpdateTransactionResult;
  } catch (error) {
    return {
      success: false,
      message: `${data.id}の在庫調整の更新に失敗しました`,
      errors: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function deleteAdjustmentTransfer(id: number) {
  try {
    // Prismaを使用してデータベースに保存
    const deleteTransfer = await prisma.transferStockAdjustment.delete({
      where: {
        id,
      },
    });
    return {
      message: `在庫調整'${deleteTransfer.referenceNumber}'が正常に作成されました`,
      success: true,
    };
  } catch (error) {
    console.error('データベースエラー:', error);
    return {
      message: `${id}の在庫調整の作成に失敗しました`,
      success: false,
      errors: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function updateAdjustmentAdd(data: AdjustmentAddSchemaType) {
  const result = adjustmentAddSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.format(),
      message: 'データの形式が正しくありません。入力データを確認してください。',
    };
  }
  console.log('data', result.data);
  try {
    const transactionResult = await prisma.$transaction(async (prisma) => {
      // 既存の在庫調整を検索
      const existingAdjustment = await prisma.addStockAdjustment.findUnique({
        where: { id: result.data.id },
        include: { item: true, warehouse: true },
      });

      if (!existingAdjustment) {
        throw new Error('在庫調整がありません。');
      }
      console.log('Existing adjustment:', existingAdjustment);

      // 在庫数量の差分を計算 (新しい数量 - 古い数量)
      const qtyChange =
        result.data.addStockQty - existingAdjustment.addStockQty;

      console.log('Operation successful:', qtyChange);

      // 在庫調整の更新
      const updateStock = await prisma.addStockAdjustment.update({
        where: {
          id: result.data.id,
        },
        data: {
          addStockQty: { increment: qtyChange },
          notes: result.data.notes,
          referenceNumber: result.data.referenceNumber,
          item: { connect: { title: result.data.item } },
          supplier: { connect: { name: result.data.supplier } },
          warehouse: { connect: { name: result.data.receivingWarehouse } },
        },
      });

      console.log('Updated stock adjustment:', updateStock);

      // Itemの在庫を更新
      const item = await prisma.item.update({
        where: { id: existingAdjustment.item.id },
        data: { qty: { increment: qtyChange } },
        select: { id: true, qty: true },
      });

      console.log('Updated item:', item);

      // ウェアハウスの在庫を更新
      const warehouseStock = await prisma.warehouse.update({
        where: { id: existingAdjustment.warehouse.id },
        data: { stockQty: { increment: qtyChange } },
      });

      return {
        message: `在庫調整'${updateStock.referenceNumber}'が正常に${
          existingAdjustment ? '更新' : '作成'
        }されました`,
        success: true,
        data: updateStock,
      };
    });

    revalidatePath('/dashboard/inventory/adjustments');

    console.log('transactionResult', transactionResult);
    return transactionResult;
  } catch (error) {
    return {
      message: `${data.referenceNumber}の更新に失敗しました`,
      success: false,
      errors: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function createAdjustmentAdd(data: AdjustmentAddSchemaType) {
  const result = adjustmentAddSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.format(),
    };
  }
  console.log(result.data);

  try {
    const transactionResult = await prisma.$transaction(async (prisma) => {
      // 在庫調整を作成
      const addStockAdjustment = await prisma.addStockAdjustment.create({
        data: {
          referenceNumber: result.data.referenceNumber,
          notes: result.data.notes,
          addStockQty: result.data.addStockQty,
          item: {
            connect: {
              title: result.data.item,
            },
          },
          supplier: {
            connect: {
              name: result.data.supplier,
            },
          },
          warehouse: {
            connect: {
              name: result.data.receivingWarehouse,
            },
          },
        },
      });

      // Itemの在庫を更新
      const item = await prisma.item.update({
        where: {
          id: addStockAdjustment.itemId,
        },
        data: {
          qty: {
            increment: result.data.addStockQty,
          },
        },
        select: {
          id: true,
          qty: true,
        },
      });

      // ウェアハウスの在庫を更新
      const warehouseStock = await prisma.warehouse.update({
        where: {
          id: addStockAdjustment?.warehouseId,
        },
        data: {
          stockQty: {
            increment: result.data.addStockQty,
          },
        },
      });

      revalidatePath('/dashboard/inventory/adjustments');

      return {
        message: `在庫調整'${addStockAdjustment.referenceNumber}'が正常に作成されました`,
        success: true,
        data: addStockAdjustment,
      };
    });
    console.log('transactionResult', transactionResult);
    return transactionResult;
  } catch (error) {
    return {
      message: `${data.referenceNumber}の更新に失敗しました`,
      success: false,
      errors: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// export async function updateAdjustmentAdd(data: AdjustmentAddSchemaType) {
//   const result = adjustmentAddSchema.safeParse(data);
//   if (!result.success) {
//     return {
//       success: false,
//       errors: result.error.format(),
//     };
//   }
//   try {
//     const transactionResult = await prisma.$transaction(async (prisma) => {
//       const existingAdjustment = await prisma.addStockAdjustment.findUnique({
//         where: { id: result.data.id },
//       });

//       if (!existingAdjustment) {
//         throw new Error('在庫調整が見つかりません');
//       }
//       const qtyDifference = data.addStockQty - existingAdjustment.addStockQty;

//       // Itemの在庫を更新
//       const item = await prisma.item.update({
//         where: {
//           id: existingAdjustment.itemId,
//         },
//         data: {
//           qty: {
//             increment: qtyDifference,
//           },
//         },
//         select: {
//           id: true,
//           qty: true,
//         },
//       });

//       // ウェアハウスの在庫を更新
//       const warehouseStock = await prisma.warehouse.update({
//         where: {
//           id: existingAdjustment.warehouseId,
//         },
//         data: {
//           stockQty: {
//             increment: qtyDifference,
//           },
//         },
//       });

//       // 在庫調整を作成
//       const addStock = await prisma.addStockAdjustment.update({
//         where: {
//           id: existingAdjustment.id,
//         },
//         data: {
//           addStockQty: result.data.addStockQty,
//           notes: result.data.notes,
//           referenceNumber: result.data.referenceNumber,
//           warehouse: {
//             connect: {
//               id: warehouseStock.id,
//             },
//           },
//           item: {
//             connect: {
//               title: result.data.item,
//             },
//           },
//           supplier: {
//             connect: {
//               name: result.data.supplier,
//             },
//           },
//         },
//       });
//       console.log('addStockAdjustment', addStock);

//       return {
//         message: `在庫調整'${addStock.referenceNumber}'が正常に更新されました`,
//         success: true,
//         data: addStock,
//       };
//     });
//     console.log('transactionResult', transactionResult);
//     return transactionResult;
//   } catch (error) {
//     return {
//       message: `${data.referenceNumber}の更新に失敗しました`,
//       success: false,
//       errors: error instanceof Error ? error.message : 'Unknown error',
//     };
//   }
// }

export async function deleteAdjustmentAdd(id: number) {
  try {
    const deleteAdd = await prisma.addStockAdjustment.delete({
      where: {
        id,
      },
    });
    return {
      message: `在庫調整'${deleteAdd.referenceNumber}'が正常に作成されました`,
      success: true,
    };
  } catch (error) {
    console.error('データベースエラー:', error);
    return {
      message: `${id}の在庫調整の作成に失敗しました`,
      success: false,
      errors: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
