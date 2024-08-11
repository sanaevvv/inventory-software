import { z } from 'zod';

export const categorySchema = z.object({
  id: z.number().optional(), // オプショナル：新規作成時は不要、更新時に使用
  title: z
    .string()
    .min(1, 'Category name is required')
    .max(100, 'Category name must be 100 characters or less'),
  description: z
    .string()
    .max(500, 'Description must be 500 characters or less')
    .optional(),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;

export const unitSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(2, {
    message: 'Unit title must be at least 2 characters.',
  }),
  abbreviation: z.string().min(1, {
    message: 'Unit abbreviation must be at least 1 characters.',
  }),
});

export type UnitSchemaType = z.infer<typeof unitSchema>;

export const deleteBrandSchema = z.object({
  id: z.number().int().positive(),
});
export const brandSchema = z.object({
  id: z.number().optional(),
  brandname: z.string().min(2, {
    message: 'Brand name must be at least 2 characters.',
  }),
});

export type BrandSchemaType = z.infer<typeof brandSchema>;

export const warehouseSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, {
    message: 'Warehouse title must be at least 2 characters.',
  }),
  location: z.string().min(2, {
    message: 'Warehouse location  must be at least 2 characters.',
  }),
  warehouseType: z.string(),
  description: z.string().min(2, {
    message: 'Warehouse description  must be at least 2 characters.',
  }),
});

export type WarehouseSchemaType = z.infer<typeof warehouseSchema>;

export const itemSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().optional(),
  sku: z.string().min(1, 'SKU is required'),
  barcode: z.string().optional(),
  imageUrl: z.string().min(1, 'Image is required').default(''),
  dimensions: z.string().max(255).optional(),
  notes: z.string().optional(),

  unit: z.string().min(1, 'Unit is required'),
  brand: z.string().min(1, 'Brand is required'),
  warehouse: z.string().min(1, 'Warehouse is required'),
  supplier: z.string().min(1, 'Supplier is required'),
  category: z.string().min(1, 'Category is required'),

  qty: z.coerce.number().int().min(1, 'Quantity must be at least 1'),
  sellingPrice: z.coerce.number().min(1, 'Selling price is required'),
  buyingPrice: z.coerce.number().min(1, 'Buying price is required'),
  reOrderPoint: z.coerce.number().min(1, 'Re-order point is required'),
  weight: z.coerce.number().optional(),
  taxRate: z.coerce.number(),
});
export type ItemSchemaType = z.infer<typeof itemSchema>;

export const adjustmentAddSchema = z.object({
  id: z.number().optional(),
  referenceNumber: z.string().min(2, {
    message: '必須項目です。',
  }),
  addStockQty: z.coerce
    .number({
      required_error: '数量は必須です',
      invalid_type_error: '数量は数値で入力してください',
    })
    .int({ message: '数量は整数で入力してください' }),
  notes: z.string().optional(),
  receivingWarehouse: z.string().min(1),
  item: z.string().min(1),
  supplier: z.string().min(1),
});

export type AdjustmentAddSchemaType = z.infer<typeof adjustmentAddSchema>;

export const adjustmentTransferSchema = z.object({
  id: z.number().optional(),
  referenceNumber: z.string().min(2, {
    message: '入力必須です。',
  }),
  transferStockQty: z.coerce
    .number({
      required_error: '数量は必須です',
      invalid_type_error: '数量は数値で入力してください',
    })
    .int({ message: '数量は整数で入力してください' }),
  notes: z.string().optional(),
  item: z.string(),
  givingWarehouse: z.string(),
  receivingWarehouse: z.string()
});

export type AdjustmentTransferSchemaType = z.infer<
  typeof adjustmentTransferSchema
>;

export const suppliersSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, {
    message: '2文字以上の文字で入力してください',
  }),
  phone: z
    .string()
    .min(2, {
      message: '2文字以上の文字で入力してください',
    })
    .optional(),
  email: z
    .string()
    .email()
    .min(2, {
      message: '2文字以上の文字で入力してください',
    })
    .optional(),
  address: z
    .string()
    .min(2, {
      message: '2文字以上の文字で入力してください',
    })
    .optional(),
  contactPerson: z
    .string()
    .min(2, {
      message: '2文字以上の文字で入力してください',
    })
    .optional(),
  supplierCode: z.string().min(2, {
    message: '2文字以上の文字で入力してください',
  }),
  paymentTerms: z
    .string()
    .min(2, {
      message: '2文字以上の文字で入力してください',
    })
    .optional(),
  taxId: z
    .string()
    .min(2, {
      message: '2文字以上の文字で入力してください',
    })
    .optional(),
  notes: z
    .string()
    .min(2, {
      message: '2文字以上の文字で入力してください',
    })
    .optional(),
});

export type SuppliersSchemaType = z.infer<typeof suppliersSchema>;
