'use client';

import { FormInput } from '@/components/dashboard/FormInput';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormButton } from '@/components/dashboard/FormButton';
import { FormSelect } from '@/components/dashboard/FormSelect';
import { FormWrapper } from '@/app/(admin)/dashboard/inventory/_components/FormWrapper';
import { adjustmentAddSchema, AdjustmentAddSchemaType } from '@/lib/schema';
import {
  createAdjustmentAdd,
  updateAdjustmentAdd,
} from '@/app/(admin)/dashboard/inventory/_actions/create.adjustment';
import { useRouter } from 'next/navigation';
import { toast } from '../ui/use-toast';
import { AddStockAdjustment } from '@prisma/client';

type Props = {
  editValue?: AddStockAdjustment & {
    supplier: {
      name: string;
    };
    warehouse: {
      name: string;
    };
    item: {
      title: string;
    };
  };
  suppliers: {
    value: string;
    text: string;
  }[];
  warehouses: {
    value: string;
    text: string;
  }[];
  items: {
    value: string;
    text: string;
  }[];
};

export const FormAddInventory = ({
  editValue,
  warehouses,
  items,
  suppliers,
}: Props) => {
  const router = useRouter();
  const form = useForm<AdjustmentAddSchemaType>({
    resolver: zodResolver(adjustmentAddSchema),
    defaultValues: {
      id: editValue?.id,
      referenceNumber: editValue?.referenceNumber ?? '',
      item: editValue?.item.title ?? '',
      supplier: editValue?.supplier.name ?? '',
      receivingWarehouse: editValue?.warehouse.name ?? '',
      addStockQty: editValue?.addStockQty ?? 0,
      notes: editValue?.notes ?? '',
    },
  });

  const onSubmit = async (data: AdjustmentAddSchemaType) => {
    const result = editValue?.id
      ? await updateAdjustmentAdd(data)
      : await createAdjustmentAdd(data);

    if (result?.success) {
      toast({
        variant: 'default',
        title: result.message,
      });

      router.replace('/dashboard/inventory/adjustments');
    } else {
      toast({
        variant: 'destructive',
        title: result?.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-12 gap-8"
      >
        <FormInput
          form={form}
          name="referenceNumber"
          label="Reference Number"
          type="text"
          className="col-span-7"
          readOnly={!!editValue}
        />
        <FormSelect
          form={form}
          name="item"
          items={items}
          placeholder="- please select the item -"
          label="Item"
          className="col-span-7"
        />
        <FormSelect
          form={form}
          name="supplier"
          items={suppliers}
          placeholder="- please select the supplier -"
          label="Supplier"
          className="col-span-7"
        />
        <FormInput
          form={form}
          name="addStockQty"
          label="Quantity of stock to add"
          type="number"
          className="col-span-5"
        />
        <FormSelect
          form={form}
          name="receivingWarehouse"
          items={warehouses}
          placeholder="- please select the warehouse that will receive the stock -"
          label="Warehouse"
          className="col-span-12"
        />
        <FormInput
          form={form}
          name="notes"
          label="Adjustment Notes"
          className="col-span-full"
        />
        <FormButton form={form} className="col-span-4">
          {editValue?.id ? 'Update AddInventory' : 'Save Inventory'}
        </FormButton>
      </form>
    </Form>
  );
};
