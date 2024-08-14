'use client';

import { FormInput } from '@/components/dashboard/FormInput';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormButton } from '@/components/dashboard/FormButton';
import { suppliersSchema, SuppliersSchemaType } from '@/lib/schema';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import {
  createSupplier,
  updateSupplier,
} from '@/app/(admin)/dashboard/inventory/_actions/create.supplier';
import { Supplier } from '@prisma/client';

type Props = {
  editValue?: Supplier;
};

export const SupplierForm = ({ editValue }: Props) => {
  const router = useRouter();
  const form = useForm<SuppliersSchemaType>({
    resolver: zodResolver(suppliersSchema),
    defaultValues: {
      ...(editValue?.id && { id: editValue.id }),
      name: editValue?.name || '',
      phone: editValue?.phone || '',
      email: editValue?.email || '',
      address: editValue?.address || '',
      contactPerson: editValue?.contactPerson || '',
      supplierCode: editValue?.supplierCode,
      paymentTerms: editValue?.paymentTerms || '',
      taxId: editValue?.taxId || '',
      notes: editValue?.notes || '',
    },
  });

  const onSubmit = async (
    data: SuppliersSchemaType
  ) => {
    try {
      const result = editValue?.id ?
        await updateSupplier(data)
        : await createSupplier(data);

      if (result.success) {
        toast({
          variant: 'default',
          title: result.message,
        });
      }
      router.replace('/dashboard/inventory/suppliers');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormInput form={form} name="name" label="Supplier Name" type="text" />
        <FormInput form={form} name="phone" label="Phone" type="phone" />
        <FormInput
          form={form}
          name="email"
          label="Supplier Email"
          type="email"
        />
        <FormInput
          form={form}
          name="address"
          label="Supplier Address"
          type="text"
        />
        <FormInput
          form={form}
          name="contactPerson"
          label="Supplier Contact Person"
          type="text"
        />
        <FormInput form={form} name="taxId" label="Supplier TIN" type="text" />
        <FormInput
          form={form}
          name="supplierCode"
          label="Supplier Code"
          type="text"
        />

        <FormInput
          form={form}
          name="paymentTerms"
          label="Supplier PaymentTerms"
        />
        <FormInput form={form} name="notes" label="Notes" />
        <FormButton form={form}>
          {editValue?.id ? 'Update Supplier' : 'Create Supplier'}
        </FormButton>
      </form>
    </Form>
  );
};
