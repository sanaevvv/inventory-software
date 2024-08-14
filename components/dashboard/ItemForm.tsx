'use client';

import { FormInput } from '@/components/dashboard/FormInput';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormButton } from '@/components/dashboard/FormButton';
import { itemSchema, ItemSchemaType } from '@/lib/schema';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import {
  createItem,
  updateItem,
} from '@/app/(admin)/dashboard/inventory/_actions/create.item';
// import { Item } from '@prisma/client';
import { FormImage } from './FormImage';
import { FormSelect } from './FormSelect';

type Props = {
  editValue?: ItemSchemaType & {
    category: {
      title: string;
    };
    warehouse: {
      name: string;
    };
    supplier: {
      name: string;
    };
    brand: {
      brandname: string;
    };
    unit: {
      title: string;
    };
  };
  categories: {
    value: string;
    text: string;
  }[];
  warehouses: {
    value: string;
    text: string;
  }[];
  units: {
    value: string;
    text: string;
  }[];
  brands: {
    value: string;
    text: string;
  }[];
  suppliers: {
    value: string;
    text: string;
  }[];
};

export const ItemForm = ({
  editValue,
  warehouses,
  categories,
  brands,
  units,
  suppliers,
}: Props) => {
  const router = useRouter();
  const form = useForm<ItemSchemaType>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      id: editValue?.id,
      unit: editValue?.unit.title ?? undefined,
      brand: editValue?.brand.brandname ?? undefined,
      supplier: editValue?.supplier.name ?? undefined,
      warehouse: editValue?.warehouse.name ?? undefined,
      category: editValue?.category.title ?? undefined,

      qty: editValue?.qty ?? 0,
      buyingPrice: editValue?.buyingPrice ?? 0,
      sellingPrice: editValue?.sellingPrice ?? 0,
      reOrderPoint: editValue?.reOrderPoint ?? 0,
      weight: editValue?.weight ?? 0,
      taxRate: editValue?.taxRate ?? 8,

      title: editValue?.title ?? '',
      sku: editValue?.sku ?? '',
      barcode: editValue?.barcode ?? '',
      dimensions: editValue?.dimensions ?? '',
      notes: editValue?.notes ?? '',
      description: editValue?.description ?? '',
      imageUrl: editValue?.imageUrl ?? '',
    },
  });

  const onSubmit = async (data: ItemSchemaType) => {
    try {
      const result = editValue?.id
        ? await updateItem(data)
        : await createItem(data);

      if (result?.success) {
        toast({
          variant: 'default',
          title: result?.message,
        });

        router.replace('/dashboard/inventory/items');
      } else {
        toast({
          variant: 'destructive',
          title: result?.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 sm:col-span-2 grid grid-cols-4 gap-x-8"
      >
        <FormInput
          form={form}
          name="title"
          label="Title "
          type="text"
          className="col-span-full"
        />
        <FormInput
          form={form}
          name="description"
          label="Description"
          className="col-span-full"
          required={false}
        />
        <FormInput
          form={form}
          name="qty"
          label="Quantity"
          type="number"
          className="col-span-2"
        />
        <FormInput
          form={form}
          name="sku"
          label="SKU"
          type="text"
          className="col-span-2"
        />
        <FormInput
          form={form}
          name="barcode"
          label="Barcode"
          type="text"
          className="col-span-2"
          required={false}
        />
        <FormInput
          form={form}
          name="buyingPrice"
          label="Buying Price"
          type="number"
          className="col-span-2"
        />
        <FormInput
          form={form}
          name="sellingPrice"
          label="Selling Price"
          type="number"
          className="col-span-2"
        />
        <FormInput
          form={form}
          name="reOrderPoint"
          label="Re-order Point"
          type="number"
          className="col-span-2"
        />
        <FormInput
          form={form}
          name="weight"
          label="Weight"
          type="number"
          className="col-span-2"
          required={false}
        />
        <FormInput
          form={form}
          name="dimensions"
          label="Dimensions"
          type="text"
          className="col-span-2"
          required={false}
        />
        <FormInput
          form={form}
          name="taxRate"
          label="TaxRate"
          type="number"
          className="col-span-2"
        />

        <FormSelect
          form={form}
          name="category"
          label="Category"
          items={categories}
          className="col-span-2"
          placeholder="- please select the category -"
        />
        <FormSelect
          form={form}
          name="unit"
          label="Unit"
          items={units}
          className="col-span-2"
          placeholder="- please select the unit -"
        />

        <FormSelect
          form={form}
          name="brand"
          label="Brand"
          items={brands}
          className="col-span-2"
          placeholder="- please select the brand -"
        />

        <FormSelect
          form={form}
          name="supplier"
          label="Supplier"
          items={suppliers}
          className="col-span-2"
          placeholder="- please select the supplier -"
        />

        <FormSelect
          form={form}
          name="warehouse"
          label="Warehouse"
          items={warehouses}
          placeholder="- please select the warehouse -"
          className="col-span-2"
        />

        <FormInput
          form={form}
          name="notes"
          label="Notes"
          className="col-span-full"
          required={false}
        />

        <FormImage
          form={form}
          endpoint="imageUploader"
          label="Image"
          className="col-span-full"
        />

        <FormButton form={form}>
          {editValue?.id ? 'Update Item' : 'Create Item'}
        </FormButton>
      </form>
    </Form>
  );
};
