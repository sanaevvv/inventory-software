'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Unit } from '@prisma/client';
import { InventoryDate } from '@/components/dashboard/InventoryDate';
import { InventoryActions } from '@/components/dashboard/InventoryActions';

export const columns: ColumnDef<Unit>[] = [
  {
    accessorKey: 'title',
    header: 'Unit',
  },
  {
    accessorKey: 'abbreviation',
    header: 'Abbreviation',
  },
  // {
  //   accessorKey: 'createdAt',
  //   header: 'createdAt',
  //   cell: ({ row }) => <InventoryDate date={row.original.createdAt} />,
  // },
  {
    id: 'actions',
    cell:({row})=><InventoryActions id={row.original.id} entity='units'/>
  },
];
