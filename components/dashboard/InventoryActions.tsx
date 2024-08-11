import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { EditLink } from './EditLink';
import { DeleteButton } from './DeleteButton';
import { deleteWarehouse } from '@/app/(admin)/dashboard/inventory/_actions/create.warehouse';
import { deleteUnit } from '@/app/(admin)/dashboard/inventory/_actions/create.unit';
import { deleteBrand } from '@/app/(admin)/dashboard/inventory/_actions/create.brand';
import { deleteSupplier } from '@/app/(admin)/dashboard/inventory/_actions/create.supplier';
import { deleteCategory } from '@/app/(admin)/dashboard/inventory/_actions/create.category';
import { deleteItem } from '@/app/(admin)/dashboard/inventory/_actions/create.item';
import { deleteAdjustmentAdd, deleteAdjustmentTransfer } from '@/app/(admin)/dashboard/inventory/_actions/create.adjustment';

type Props = {
  id: number;
  entity:
    | 'warehouses'
    | 'units'
    | 'brands'
    | 'suppliers'
    | 'categories'
    | 'items'
    | 'adjustments/add'
    | 'adjustments/transfer';
};

const getDeleteFunction = (entity: Props['entity']) => {
  switch (entity) {
    case 'warehouses':
      return deleteWarehouse;
    case 'units':
      return deleteUnit;
    case 'brands':
      return deleteBrand;
    case 'suppliers':
      return deleteSupplier;
    case 'categories':
      return deleteCategory;
    case 'items':
      return deleteItem;
    case 'adjustments/add':
      return deleteAdjustmentAdd;
    case 'adjustments/transfer':
      return deleteAdjustmentTransfer;
    default:
      throw new Error(`Unsupported entity type: ${entity}`);
  }
};
export const InventoryActions = ({ id, entity }: Props) => {
  const deleteFunction = getDeleteFunction(entity);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <EditLink id={String(id)} entity={entity} />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <DeleteButton id={id} onDelete={deleteFunction} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
