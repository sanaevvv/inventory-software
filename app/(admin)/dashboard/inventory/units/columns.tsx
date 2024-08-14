'use client';

import { ColumnDef } from '@tanstack/react-table';
// import { Unit } from '@prisma/client';
import { InventoryActions } from '@/components/dashboard/InventoryActions';
import { UnitSchemaType } from '@/lib/schema';

export const columns: ColumnDef<UnitSchemaType>[] = [
  {
    accessorKey: 'title',
    header: 'Unit',
  },
  {
    accessorKey: 'abbreviation',
    header: 'Abbreviation',
  },
  {
    id: 'actions',
    cell: ({ row }) => <InventoryActions id={row.original.id!} entity="units" />,
  },
];
