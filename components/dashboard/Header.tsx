import {
  Bell,
  Grip,
  History,
  Settings,
  Users,
} from 'lucide-react';
import { SearchInput } from './SearchInput';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlusIcon } from './PlusIcon';
import { SpMenu } from './SpMenu';
import { auth } from '@/auth';
import { HeaderDrop } from './HeaderDropdown';

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
];

export const Header = async () => {
  const session = await auth();
  if (!session?.user) return null;

  return (
    <header className="bg-slate-50 border-b shadow-sm flex items-center justify-between px-6 py-4 sm:py-3 md:py-2 lg:py-1">
      <div className="hidden md:flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="transition-all rounded-full p-2 hover:bg-slate-200">
              <History size={20} />
            </TooltipTrigger>
            <TooltipContent>
              <p>History</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <SearchInput />
      </div>

      <div className="hidden md:flex h-5 items-center space-x-4">
        <PlusIcon text="Refer and Earn" size={20} />

        <Separator orientation="vertical" />

        <ul className="flex h-5 items-center">
          {Icons.map(({ icon: Icon, toolTip }) => (
            <li key={toolTip}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="transition-all rounded-full p-2 hover:bg-slate-200">
                    <Icon size={20} />
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

        <HeaderDrop username={session.user.name} />

        {session.user.image ? (
          <Avatar>
            <AvatarImage src={session.user.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ) : (
          ''
        )}
        <Grip />
      </div>
      <div className="flex justify-between w-full md:hidden">
        <SpMenu />
        {session.user.image ? (
          <Avatar>
            <AvatarImage src={session.user.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ) : (
          ''
        )}
      </div>
    </header>
  );
};
