'use client';

import { FormInput } from '@/components/dashboard/FormInput';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormButton } from '@/components/dashboard/FormButton';
import { categorySchema, CategorySchemaType } from '@/lib/schema';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import {
  createCategory,
  updateCategory,
} from '@/app/(admin)/dashboard/inventory/_actions/create.category';
// import { Category } from '@prisma/client';

type Props = {
  editValue?: CategorySchemaType;
};
export const CategoryForm = ({ editValue }: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      id: editValue?.id || undefined,
      title: editValue?.title || '',
      description: editValue?.description || undefined,
    },
  });

  const onSubmit = async (data: CategorySchemaType) => {
    try {
      let result;
      if (editValue?.id) {
        // 更新操作
        result = await updateCategory({ ...data, id: editValue.id });
      } else {
        result = await createCategory(data);
      }

      if (result.success) {
        toast({
          variant: 'default',
          title: result.message,
        });

        router.push('/dashboard/inventory/categories');
      } else {
        console.error(result.errors);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to save category. Please try again.',
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 sm:col-span-2"
      >
        <FormInput form={form} name="title" label="Category Name" type="text" />
        <FormInput
          form={form}
          name="description"
          label="Category Description"
          required={false}
        />

        <FormButton form={form}>
          {editValue?.id ? 'Update Category' : 'Create Category'}
        </FormButton>
      </form>
    </Form>
  );
};
