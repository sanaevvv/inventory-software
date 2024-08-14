'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
  Item,
} from '@prisma/client';
import { InventoryActions } from '@/components/dashboard/InventoryActions';
import { InventoryDate } from '@/components/dashboard/InventoryDate';
import { InventoryImage } from '@/components/dashboard/InventoryImage';
// import { ItemSchemaType } from '@/lib/schema';

type ItemType = Item & {
  category: {
    title: string;
  };
  warehouse: {
    name: string;
  };
};

export const columns: ColumnDef<ItemType>[] = [
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => (
      <InventoryImage
        imageUrl={row.original.imageUrl}
        alt={row.original.title}
      />
    ),
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => row.original.title || 'No Title',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => row.original.qty || 'No Quantity',
  },
  {
    accessorKey: 'category.title',
    header: 'Category',
    cell: ({ row }) => row.original.category?.title || 'No Category',
  },
  {
    accessorKey: 'warehouse.name',
    header: 'Warehouse',
    cell: ({ row }) => row.original.warehouse?.name || 'No Warehouse',
  },
  {
    accessorKey: 'createdAt',
    header: 'createdAt',
    cell: ({ row }) => <InventoryDate date={row.original.createdAt} />,
  },
  {
    id: 'actions',
    cell: ({ row }) => <InventoryActions id={row.original.id!} entity="items" />,
  },
];
