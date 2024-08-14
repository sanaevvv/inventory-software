'use client';

import { FormInput } from '@/components/dashboard/FormInput';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormButton } from '@/components/dashboard/FormButton';
import { warehouseSchema, WarehouseSchemaType } from '@/lib/schema';
import { FormSelect } from '@/components/dashboard/FormSelect';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import {
  createWarehouse,
  updateWarehouse,
} from '@/app/(admin)/dashboard/inventory/_actions/create.warehouse';
// import { Warehouse } from '@prisma/client';

export const warehouseTypes = [
  { value: 'frozen', text: '冷凍倉庫' },
  { value: 'refrigerated', text: '冷蔵倉庫' },
  { value: 'room-temperature', text: '常温倉庫' },
];

type Props = {
  editValue?: WarehouseSchemaType;
};

export const WarehouseForm = ({ editValue }: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<WarehouseSchemaType>({
    resolver: zodResolver(warehouseSchema),
    defaultValues: {
      id: editValue?.id,
      name: editValue?.name || '',
      location: editValue?.location || '',
      warehouseType: editValue?.warehouseType || '',
      description: editValue?.description || '',
    },
  });

  const onSubmit = async (data: WarehouseSchemaType) => {
    try {
      const result = editValue?.id
        ? await updateWarehouse(data)
        : await createWarehouse(data);

      if (result.success) {
        toast({
          variant: 'default',
          title: result.message,
        });

        router.replace('/dashboard/inventory/warehouses');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormSelect
          form={form}
          name="warehouseType"
          items={warehouseTypes}
          placeholder="- please select the warehouse type-"
          label="Warehouse Type"
        />
        <FormInput form={form} name="name" label="Warehouse Name" type="text" />
        <FormInput
          form={form}
          name="location"
          label="Warehouse Location"
          type="text"
        />
        <FormInput
          form={form}
          name="description"
          label="Warehouse Description"
        />
        <FormButton form={form}>
          {editValue?.id ? 'Update Warehouse' : 'Create Warehouse'}
        </FormButton>
      </form>
    </Form>
  );
};
