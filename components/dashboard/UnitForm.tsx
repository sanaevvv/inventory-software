'use client';

import { FormInput } from '@/components/dashboard/FormInput';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormButton } from '@/components/dashboard/FormButton';
import { unitSchema, UnitSchemaType } from '@/lib/schema';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import {
  createUnit,
  updateUnit,
} from '@/app/(admin)/dashboard/inventory/_actions/create.unit';
import { Unit } from '@prisma/client';

type Props = {
  editValue?: Unit;
};

export const UnitForm = ({ editValue }: Props) => {
  const router = useRouter();

  const form = useForm<UnitSchemaType>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      id: editValue?.id,
      title: editValue?.title,
      abbreviation: editValue?.abbreviation,
    },
  });

  const onSubmit = async (data: UnitSchemaType) => {
    try {
      const result = editValue?.id
        ? await updateUnit(data)
        : await createUnit(data);

      if (result.success) {
        toast({
          variant: 'default',
          title: result.message,
        });

        router.replace('/dashboard/inventory/units');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 sm:col-span-2"
      >
        <FormInput form={form} name="title" label="Unit" type="text" />
        <FormInput
          form={form}
          name="abbreviation"
          label="Unit Abbreviation"
          type="text"
        />

        <FormButton form={form}>
          {editValue?.id ? 'Update Unit' : 'Create Unit'}
        </FormButton>
      </form>
    </Form>
  );
};

export default UnitForm;
