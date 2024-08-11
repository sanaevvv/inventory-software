'use client';

import { ColumnDef } from '@tanstack/react-table';
import { InventoryActions } from '@/components/dashboard/InventoryActions';
import { Category } from '@prisma/client';

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'title',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <InventoryActions id={row.original.id} entity="categories" />
    ),
  },
];
