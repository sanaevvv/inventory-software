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
      <Icon strokeWidth={1} />
      {label}
      {Arrow && (
        <Arrow className="absolute right-1 top-3" size={16} strokeWidth={1} />
      )}
    </CollapsibleTrigger>
  );
};
