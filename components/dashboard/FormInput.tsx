'use client';

import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';

type Props = {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  form: UseFormReturn<any>;
  className?: string;
  readOnly?: boolean;
};

export const FormInput = ({
  label,
  name,
  required = true,
  type,
  form,
  className,
  readOnly = false
}: Props) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            {type ? (
              <Input
                placeholder={
                  type !== 'number' ? `Type the ${label.toLowerCase()}` : ''
                }
                {...field}
                required={required}
                type={type}
                min={0}
                readOnly={readOnly}
              />
            ) : (
              <Textarea
                placeholder={`Type the ${label.toLowerCase()}`}
                className="resize-none"
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
