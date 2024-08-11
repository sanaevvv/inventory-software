import { CircleCheck, PackageCheck, ReceiptText, Truck } from 'lucide-react';
import React from 'react'
import { Separator } from '../ui/separator';
import { InventorySummaryCard } from './InventorySummaryCard';
import { ActivityCard } from './ActivityCard';

const Activities = [
  {
    number: 0,
    unit: 'Qty',
    icon: CircleCheck,
    text: 'TO BE PACKED',
    href: '',
  },
  {
    number: 0,
    unit: 'Pkgs',
    icon: Truck,
    text: 'TO BE SHIPPED',
    href: '',
  },
  {
    number: 0,
    unit: 'Pkgs',
    icon: PackageCheck,
    text: 'TO BE DELIVERED',
    href: '',
  },
  {
    number: 0,
    unit: 'Qty',
    icon: ReceiptText,
    text: 'TO BE INVOICED',
    href: '',
  },
];

const InventorySummary = [
  {
    title: 'QUANTITY IN HAND',
    number: 100
   },
  {
    title: 'QUANTITY TO BE RECEIVED',
    number: 10
   },
];

export const SalesOverview = () => {
  return (
    <section className="flex gap-8 py-10 px-8 bg-[#F6F6FF]">
      <div className="">
        <h2 className="text-2xl text-slate-800 mb-6">Sales Activity</h2>
        <ul className="grid grid-cols-4 gap-4">
          {Activities.map(({ number, unit, icon, text, href }) => (
            <ActivityCard
              key={text}
              number={number}
              unit={unit}
              icon={icon}
              text={text}
              href={href}
            />
          ))}
        </ul>
      </div>

      <Separator orientation="vertical" className="h-50" />

      <div className="flex-1">
        <div className="">
          <h2 className="text-2xl text-slate-800 mb-6">Inventory Summary</h2>
        </div>
        <ul className="space-y-4">
          {InventorySummary.map(({ title, number }) => (
            <InventorySummaryCard key={title} title={title} number={number} />
          ))}
        </ul>
      </div>
    </section>
  );
}
