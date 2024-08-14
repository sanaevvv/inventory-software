import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogoutButton } from '../auth/LogoutButton';
import { Button } from '../ui/button';

type Props = {
  username: string | null | undefined;
};

export const HeaderDrop = ({ username }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center gap-1 focus-visible:outline-none">
        {username}
        <ChevronDown className="stroke-slate-600 size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-center">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button variant={'ghost'}>
            Billing
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button variant={'ghost'} >
            Team
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
