'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Brand } from '@prisma/client';
import { InventoryDate } from '@/components/dashboard/InventoryDate';
import { InventoryActions } from '@/components/dashboard/InventoryActions';

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: 'brandname',
    header: 'Name',
  },
  // {
  //   accessorKey: 'createdAt',
  //   header: 'createdAt',
  //   cell: ({ row }) => <InventoryDate date={row.original.createdAt} />,
  // },
  // {
  //   accessorKey: 'updatedAt',
  //   header: 'updatedAt',
  //   cell: ({ row }) => <InventoryDate date={row.original.updatedAt} />,
  // },
  {
    id: 'actions',
    cell: ({ row }) => (
      <InventoryActions id={row.original.id} entity="brands" />
    ),
  },
];
