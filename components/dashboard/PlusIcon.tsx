import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CirclePlus } from 'lucide-react';

export const PlusIcon = ({text,size}:{text:string, size:number}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="transition-all rounded-full p-2 hover:bg-slate-200">
          <CirclePlus size={size} />
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
