'use client';

import {
  BadgeJapaneseYen,
  Blocks,
  Boxes,
  House,
  ShoppingBag,
  ClipboardList,
  BookOpen,
  ChevronsUpDown,
  LucideIcon,
  ArrowRightFromLine,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Collapsible } from '@/components/ui/collapsible';
import { CollapsibleTriggerLink as TriggerLink } from './CollapsibleTrigger';
import { Button } from '../ui/button';
import Link from 'next/link';
import { SubscriptionCard } from './SubscriptionCard';
import { CollapsibleContentLink as ContentLink } from './CollapsibleContentLink';
import Image from 'next/image';

const dashboard = '/dashboard';
const path = `${dashboard}/inventory`;

export const NavLink = [
  {
    label: 'Home',
    href: `${dashboard}/home/overview`,
    icon: House,
  },
  {
    label: 'Inventory',
    href: `${path}`,
    icon: Boxes,
    arrow: ChevronsUpDown,
  },
  {
    label: 'Sales',
    href: `${dashboard}/sales`,
    icon: BadgeJapaneseYen,
    arrow: ChevronsUpDown,
  },
  {
    label: 'Purchases',
    href: `${dashboard}/purchases`,
    icon: ShoppingBag,
    arrow: ChevronsUpDown,
  },
  {
    label: 'Integrations',
    href: `${dashboard}/integrations`,
    icon: Blocks,
  },
  {
    label: 'Reports',
    href: `${dashboard}/reports`,
    icon: ClipboardList,
  },
  {
    label: 'Documents',
    href: `${dashboard}/documents`,
    icon: BookOpen,
  },
];

export const InventoryList = [
  {
    label: 'Items',
    href: `${path}/items`,
  },
  {
    label: 'Categories',
    href: `${path}/categories`,
  },
  {
    label: 'Brands',
    href: `${path}/brands`,
  },
  {
    label: 'Units',
    href: `${path}/units`,
  },
  {
    label: 'Warehouses',
    href: `${path}/warehouses`,
  },
  {
    label: 'Adjustments',
    href: `${path}/adjustments`,
  },
  {
    label: 'Suppliers',
    href: `${path}/suppliers`,
  },
];

export const SalesList = [
  {
    label: 'Customers',
    href: `${path}/items`,
  },
  {
    label: 'Sales Orders',
    href: `${path}/item-group`,
  },
  {
    label: 'Packages',
    href: `${path}/adjustments`,
  },
  {
    label: 'Shipments',
    href: `${path}/adjustments`,
  },
  {
    label: 'Invoices',
    href: `${path}/adjustments`,
  },
  {
    label: 'Sales Receipt',
    href: `${path}/adjustments`,
  },
  {
    label: 'Payment Received',
    href: `${path}/adjustments`,
  },
  {
    label: 'Sales Returns',
    href: `${path}/adjustments`,
  },
  {
    label: 'Credit Notes',
    href: `${path}/adjustments`,
  },
];

export const Sidebar = () => {
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
          <Collapsible className="font-light">
            <TriggerLink icon={Icon} label={label} arrow={arrow} />
            <ContentLink links={InventoryList} />
          </Collapsible>
        );
      case 'Sales':
        return (
          <Collapsible className="font-light">
            <TriggerLink icon={Icon} label={label} arrow={arrow} />
            <ContentLink links={SalesList} />
          </Collapsible>
        );
      case 'Purchases':
        return (
          <Collapsible className="font-light">
            <TriggerLink icon={Icon} label={label} arrow={arrow} />
            <ContentLink links={InventoryList}/>
          </Collapsible>
        );
      default:
        return (
          <Link href={href}>
            <Button
              variant={'ghost'}
              className={`hover:bg-white/70 hover:rounded hover:font-normal w-full justify-start text-base transition-all`}
            >
              <Icon className="mr-4 stroke-[1px]" />
              <span className="font-light">{label}</span>
            </Button>
          </Link>
        );
    }
  };

  return (
    <div className="min-h-screen sticky top-0">
      <div className="space-y-4 py-2 bg-slate-900">
        <Link href="/dashboard" className="grid place-items-center">
            <Image
              src="/logo.png"
              height={30}
              width={140}
              className=""
              alt="logo"
            />
            <p className="text-neutral-400 text-xs pt-0.5">
              飲食店在庫システム
            </p>
        </Link>
      </div>

      <nav className="py-6 hidden md:block overflow-y-auto">
        <ul className="space-y-2 px-2">
          {NavLink.map(({ icon, label, href, arrow }) => (
            <li
              key={label}
              className='relative'
            >
              <>{renderContent(icon, label, href, arrow)}</>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sticky top-full pb-6">
        <SubscriptionCard />
        <ArrowRightFromLine size={20} className="md:hidden" />
      </div>
    </div>
  );
};
