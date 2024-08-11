'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Item, TransferStockAdjustment, Warehouse } from '@prisma/client';
import { InventoryDate } from '@/components/dashboard/InventoryDate';
import { InventoryActions } from '@/components/dashboard/InventoryActions';

type CustomTransferAdjustment = TransferStockAdjustment & {
  givingWarehouse: Warehouse;
  receivingWarehouse: Warehouse;
  item: Item;
};

export const transferColumns: ColumnDef<CustomTransferAdjustment>[] = [
  {
    accessorKey: 'referenceNumber',
    header: 'Reference',
  },
  {
    accessorKey: 'givingWarehouse.name',
    header: 'Giving Warehouse',
  },
  {
    accessorKey: 'receivingWarehouse.name',
    header: 'Receiving Warehouse',
  },
  {
    accessorKey: 'item.title',
    header: 'Item',
  },
  {
    accessorKey: 'transferStockQty',
    header: 'Transfer Qty',
  },
  {
    accessorKey: 'createdAt',
    header: 'createdAt',
    cell: ({ row }) => <InventoryDate date={row.original.createdAt} />,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <InventoryActions id={row.original.id} entity="adjustments/transfer" />
    ),
  },
];
