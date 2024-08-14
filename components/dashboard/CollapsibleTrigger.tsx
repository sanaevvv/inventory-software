import { LucideIcon } from 'lucide-react';
import { CollapsibleTrigger } from '@/components/ui/collapsible';

type Props = {
  icon: LucideIcon;
  label: string;
  arrow?: LucideIcon;
};

export const CollapsibleTriggerLink = ({
  icon: Icon,
  label,
  arrow:Arrow,
}: Props) => {
  return (
    <CollapsibleTrigger className="flex gap-4 w-full px-4 p-2 hover:bg-white/70 hover:text-primary rounded">
      <Icon className="stroke-[1px]" />
      {label}
      {Arrow && (
        <Arrow
          className="absolute right-1 top-3 stroke-[1px]"
          size={16}
        />
      )}
    </CollapsibleTrigger>
  );
};
