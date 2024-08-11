'use client';

import { ColumnDef } from '@tanstack/react-table';
import { AddStockAdjustment, Item, Warehouse } from '@prisma/client';
import { InventoryActions } from '@/components/dashboard/InventoryActions';
import { InventoryDate } from '@/components/dashboard/InventoryDate';

type CustomAddStockAdjustment = AddStockAdjustment & {
  warehouse: Warehouse;
  item: Item
}
export const addAdjustmentColumns: ColumnDef<CustomAddStockAdjustment>[] = [
  {
    accessorKey: 'referenceNumber',
    header: 'Reference',
  },
  {
    accessorKey: 'warehouse.name',
    header: 'Warehouse',
  },
  {
    accessorKey: 'item.title',
    header: 'Item',
  },
  {
    accessorKey: 'addStockQty',
    header: 'Add Stock Qty',
  },
  {
    accessorKey: 'createdAt',
    header: 'createdAt',
    cell: ({ row }) => <InventoryDate date={row.original.createdAt} />,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <InventoryActions id={row.original.id} entity="adjustments/add" />
    ),
  },
];
