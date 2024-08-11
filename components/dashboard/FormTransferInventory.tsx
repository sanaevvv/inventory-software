'use client';

import { FormInput } from '@/components/dashboard/FormInput';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormButton } from '@/components/dashboard/FormButton';
import { FormSelect } from '@/components/dashboard/FormSelect';
import { FormWrapper } from '@/app/(admin)/dashboard/inventory/_components/FormWrapper';
import {
  adjustmentTransferSchema,
  AdjustmentTransferSchemaType,
} from '@/lib/schema';
import {
  createAdjustmentTransfer,
  updateAdjustmentTransfer,
} from '@/app/(admin)/dashboard/inventory/_actions/create.adjustment';
import { useRouter } from 'next/navigation';
import { toast } from '../ui/use-toast';
import { Item, TransferStockAdjustment, Warehouse } from '@prisma/client';

type Props = {
  editValue?: TransferStockAdjustment & {
    givingWarehouse: {
      name: string;
    };
    receivingWarehouse: {
      name: string;
    };
    item: {
      title: string;
    };
  };
  warehouses: {
    value: string;
    text: string;
  }[];
  items: {
    value: string;
    text: string;
  }[];
};

export const FormTransferInventory = ({
  warehouses,
  items,
  editValue,
}: Props) => {
  const router = useRouter();
  const form = useForm<AdjustmentTransferSchemaType>({
    resolver: zodResolver(adjustmentTransferSchema),
    defaultValues: {
      id: editValue?.id,
      referenceNumber: editValue?.referenceNumber || '',
      transferStockQty: editValue?.transferStockQty || 0,
      givingWarehouse: editValue?.givingWarehouse.name || undefined,
      receivingWarehouse: editValue?.receivingWarehouse.name || undefined,
      item: editValue?.item.title || undefined,
      notes: editValue?.notes || '',
    },
  });

  const onSubmit = async (data: AdjustmentTransferSchemaType) => {
    const result = editValue?.id
      ? await updateAdjustmentTransfer(data)
      : await createAdjustmentTransfer(data);

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
        />
        <FormInput
          form={form}
          name="transferStockQty"
          label="Quantity of Stock to Transfer"
          type="number"
          className="col-span-5"
        />
        <FormSelect
          form={form}
          name="givingWarehouse"
          items={warehouses}
          placeholder="- please select the warehouse that will receive
          the stock -"
          label="From: Warehouse"
          className="col-span-full"
        />
        <FormSelect
          form={form}
          name="receivingWarehouse"
          items={warehouses}
          placeholder="- please select the warehouse that will transfer
          the stock -"
          label="To: Warehouse"
          className="col-span-full"
        />
        <FormSelect
          form={form}
          name="item"
          items={items}
          placeholder="- please select the item -"
          label="Item"
          className="col-span-full"
        />
        <FormInput
          form={form}
          name="notes"
          label="Adjustment Notes"
          className="col-span-full"
        />
        <FormButton form={form} className="col-span-4">
          Save Adjustment
        </FormButton>
      </form>
    </Form>
  );
};
