'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Warehouse } from '@prisma/client';
import { InventoryDate } from '@/components/dashboard/InventoryDate';
import { InventoryActions } from '@/components/dashboard/InventoryActions';
import { warehouseTypes } from '@/components/dashboard/WarehouseForm';

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
  // {
  //   accessorKey: 'createdAt',
  //   header: 'createdAt',
  //   cell: ({ row }) => <InventoryDate date={row.original.createdAt} />,
  // },
  {
    id: 'actions',
    cell: ({ row }) => (
      <InventoryActions id={row.original.id} entity="warehouses" />
    ),
  },
];
