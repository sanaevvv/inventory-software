import { Button } from '../ui/button';
import Loading from '../Loading';
import { Plus } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';

type Props = {
  form: UseFormReturn<any>;
  children: React.ReactNode;
  className?: string;
};
export const FormButton = ({ form, children, className }: Props) => {
  const { isSubmitting, isValid, isDirty } = form.formState;
  const isDisabled = isSubmitting || !isDirty || !isValid;

  return (
    <Button
      disabled={isDisabled}
      type="submit"
      className={cn('bg-slate-700 px-6', className)}
    >
      <span className="pr-2">
        {isSubmitting ? <Loading size={20} /> : <Plus size={16} />}
      </span>
      {children}
    </Button>
  );
};
