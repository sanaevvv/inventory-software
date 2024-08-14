'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Warehouse } from '@prisma/client';
import { InventoryActions } from '@/components/dashboard/InventoryActions';
import { warehouseTypes } from '@/components/dashboard/WarehouseForm';
import { WarehouseSchemaType } from '@/lib/schema';

export const columns: ColumnDef<Warehouse>[] = [
  {
    accessorKey: 'name',
    header: 'Warehouse Name',
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'warehouseType',
    header: 'WarehouseType',
    cell: ({ row }) => {
      const type = warehouseTypes.find(
        (t) => t.value === row.original.warehouseType
      );
      return type ? type.text : row.original.warehouseType;
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <InventoryActions id={row.original.id!} entity="warehouses" />
    ),
  },
];
