'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Brand } from '@prisma/client';
import { InventoryActions } from '@/components/dashboard/InventoryActions';

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: 'brandname',
    header: 'Name',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <InventoryActions id={row.original.id} entity="brands" />
    ),
  },
];
