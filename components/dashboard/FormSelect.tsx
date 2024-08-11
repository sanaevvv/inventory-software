import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { UseFormReturn } from 'react-hook-form';

type Props = {
  className?: string;
  items: {
    value: string;
    text: string;
  }[];
  name: string;
  required?: boolean;
  form: UseFormReturn<any>;
  placeholder: string;
  label: string;
};

export const FormSelect = ({
  className = '',
  items,
  name,
  required = true,
  form,
  placeholder,
  label,
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
            <Select onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    items.find((item) => String(item.value) === field.value)
                      ?.text || placeholder
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {items.map((item) => (
                  <SelectItem key={item.text} value={String(item.value)}>
                    {item.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
