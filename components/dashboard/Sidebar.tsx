'use client';

import {
  ArrowLeftToLine,
  ArrowRightFromLine,
  BadgeJapaneseYen,
  Blocks,
  Boxes,
  House,
  ShoppingBag,
  ClipboardList,
  BookOpen,
  ChevronsUpDown,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { SubscriptionCard } from './SubscriptionCard';
import { Button } from '../ui/button';

const NavLink = [
  {
    label: 'Home',
    href: '/dashboard/home',
    icon: House,
  },
  {
    label: 'Inventory',
    href: '/dashboard/inventory',
    icon: Boxes,
    arrow: ChevronsUpDown,
  },
  {
    label: 'Sales',
    href: '/dashboard/sales',
    icon: BadgeJapaneseYen,
    arrow: ChevronsUpDown,
  },
  {
    label: 'Purchases',
    href: '/dashboard/purchases',
    icon: ShoppingBag,
    arrow: ChevronsUpDown,
  },
  {
    label: 'Integrations',
    href: '/dashboard/integrations',
    icon: Blocks,
  },
  {
    label: 'Reports',
    href: '/dashboard/reports',
    icon: ClipboardList,
  },
  {
    label: 'Documents',
    href: '/dashboard/documents',
    icon: BookOpen,
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="min-h-screen sticky top-0 overflow-y-auto">
      <div className="grid justify-center space-y-4 py-3 relative bg-slate-900">
        <Link href="/dashboard" className="flex gap-2 items-center">
          <Boxes />
          <span className="font-semibold text-2xl">Inventory</span>
          <ArrowLeftToLine size={20} className="absolute right-2" />
        </Link>
      </div>

      <nav className="pt-8 hidden md:block">
        <ul className="grid justify-center space-y-6">
          {NavLink.map(({ icon: Icon, href, label, arrow: Arrow }) => (
            <li
              key={label}
              className={`transition-all rounded-sm w-full px-5 py-1 hover:bg-white/80 hover:text-primary relative ${
                pathname === href ? 'bg-pink-600/80' : ''
              }`}
            >
              {Arrow ? (
                <>
                  <button className="flex gap-4 text-base hover:none">
                    <Icon />
                    {label}
                    <Arrow
                      className="absolute right-1 top-2.5"
                      size={16}
                      strokeWidth={1}
                    />

                  </button>
                </>
              ) : (
                <Link href={href} className="flex gap-4">
                  <Icon />
                  {label}
                </Link>
              )}
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
