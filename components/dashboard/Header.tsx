import { Bell, ChevronDown, CirclePlus, Grip, History, Settings, Users } from "lucide-react";
import { SearchInput } from "./SearchInput";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Icons = [
  {
    icon: Users,
    toolTip: 'Refer and Earn',
  },
  {
    icon: Bell,
    toolTip: 'Notifications',
  },
  {
    icon: Settings,
    toolTip: 'Settings',
  },
]; ;

export const Header = () => {
  return (
    <header className="bg-slate-50 border-b shadow-sm flex items-center justify-between px-6 py-2">
      <div className="flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="transition-all rounded-full p-2 hover:bg-slate-200">
              <History className="" />
            </TooltipTrigger>
            <TooltipContent>
              <p>History</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <SearchInput />
      </div>

      <div className="flex h-5 items-center space-x-4">
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="transition-all rounded-full p-2 hover:bg-slate-200">
                <CirclePlus />
              </TooltipTrigger>
              <TooltipContent>
                <p>Refer and Earn</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Separator orientation="vertical" />

        <ul className="flex h-5 items-center space-x-1">
          {Icons.map(({ icon: Icon, toolTip }) => (
            <li key={toolTip}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="transition-all rounded-full p-2 hover:bg-slate-200">
                    <Icon />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{toolTip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>

        <Separator orientation="vertical" />

        <div className="flex items-center gap-1">
          Garat
          <ChevronDown className="stroke-slate-600 size-4" />
        </div>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <Grip />
      </div>
    </header>
  );
}
