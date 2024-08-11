'use client';

import { FormInput } from '@/components/dashboard/FormInput';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormButton } from '@/components/dashboard/FormButton';
import { brandSchema, BrandSchemaType } from '@/lib/schema';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import {
  createBrand,
  updateBrand,
} from '@/app/(admin)/dashboard/inventory/_actions/create.brand';
import { Brand } from '@prisma/client';

type Props = {
  editValue?: Brand;
};

export const BrandForm = ({ editValue }: Props) => {
  const router = useRouter();
  const form = useForm<BrandSchemaType>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      id: editValue?.id,
      brandname: editValue?.brandname || '',
    },
  });

  const onSubmit = async (data: BrandSchemaType) => {
    try {
      const result = editValue?.id
        ? await updateBrand(data)
        : await createBrand(data);

      if (result.success) {
        toast({
          variant: 'default',
          title: result.message,
        });

        router.replace('/dashboard/inventory/brands');
      } else {
        toast({
          variant: 'destructive',
          title: result.message,
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: '予期しないエラーが発生しました。もう一度お試しください。',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 sm:col-span-2"
      >
        <FormInput
          form={form}
          name="brandname"
          label="Brand Name"
          type="text"
        />

        <FormButton form={form}>
          {editValue?.id ? 'Update Brand' : 'Create Brand'}
        </FormButton>
      </form>
    </Form>
  );
};
