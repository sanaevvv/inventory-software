import {
  HelpCircle,
  LayoutGrid,
  List,
  MoreHorizontal,
  PlusIcon,
} from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { entities } from '@/lib/const'

export const FixedHeader = ({ headerText }: { headerText: string }) => {
  const lowerCaseHeaderText = headerText.toLowerCase()
  const entity =
    entities.find((entity) => entity === lowerCaseHeaderText) || 'items';
  const href = `/dashboard/inventory/${entity}/new`;

  return (
    <header className="flex items-center justify-between">
      <Link
        href="/dashboard/inventory/items"
        className="font-bold text-2xl px-2"
      >
        {headerText}
      </Link>
      <div className="flex gap-4">
        <Link href={href}>
          <Button variant={'pink'}>
            <PlusIcon size={20} />
            <span className="text-base pl-2 font-semibold">New</span>
          </Button>
        </Link>
        <div className="flex">
          <Button variant={'outline'}>
            <List />
          </Button>
          <Button variant={'outline'}>
            <LayoutGrid />
          </Button>
        </div>

        <Button variant={'outline'}>
          <MoreHorizontal />
        </Button>

        <Button variant={'outline'} className="bg-orange-500">
          <HelpCircle className="text-white" />
        </Button>
      </div>
    </header>
  );
};
