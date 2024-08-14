'use client';

import { ColumnDef } from '@tanstack/react-table';
import { InventoryActions } from '@/components/dashboard/InventoryActions';
import { SuppliersSchemaType } from '@/lib/schema';
// import { Supplier } from '@prisma/client';

export const columns: ColumnDef<SuppliersSchemaType>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'contactPerson',
    header: 'Contact Person',
  },
  {
    id: 'actions',
    cell: ({ row }) => <InventoryActions id={row.original.id!} entity='suppliers'/>
  },
];
