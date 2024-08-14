'use client'

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { LucideIcon, Menu} from 'lucide-react';
import { InventoryList, NavLink, SalesList } from './Sidebar';
import { usePathname } from 'next/navigation';
import { Collapsible } from '@/components/ui/collapsible';
import { Button } from '../ui/button';
import Link from 'next/link';
import { CollapsibleContentLink as ContentLink } from './CollapsibleContentLink';
import { CollapsibleTriggerLink as TriggerLink } from './CollapsibleTrigger';

export const SpMenu = () => {
  const pathname = usePathname();

  const renderContent = (
    icon: LucideIcon,
    label: string,
    href: string,
    arrow?: LucideIcon
  ) => {
    const Icon = icon;
    switch (label) {
      case 'Inventory':
        return (
          <Collapsible>
            <TriggerLink icon={Icon} label={label} arrow={arrow} />
            <ContentLink links={InventoryList} />
          </Collapsible>
        );
      case 'Sales':
        return (
          <Collapsible>
            <TriggerLink icon={Icon} label={label} arrow={arrow} />
            <ContentLink links={SalesList} />
          </Collapsible>
        );
      case 'Purchases':
        return (
          <Collapsible>
            <TriggerLink icon={Icon} label={label} arrow={arrow} />
            <ContentLink links={InventoryList} />
          </Collapsible>
        );
      default:
        return (
          <Link href={href}>
            <Button
              className={`justify-start text-base hover:bg-white/80 hover:text-primary transition-all rounded-sm w-full bg-transparent`}
            >
              <Icon className="mr-4 stroke-[1.2px]" />
              {label}
            </Button>
          </Link>
        );
    }
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="py-6 md:hidden overflow-y-auto">
          <ul className="space-y-2 px-2">
            {NavLink.map(({ icon, label, href, arrow }) => (
              <li
                key={label}
                className={`relative ${
                  pathname === href ? 'bg-pink-600/80 rounded-sm' : ''
                }`}
              >
                <>{renderContent(icon, label, href, arrow)}</>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
