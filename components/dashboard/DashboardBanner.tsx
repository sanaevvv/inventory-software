'use client';

import { CreditCard, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

export const DashboardBanner = () => {
  const [isShow, setIsShow] = useState(false);

  return (
    <section
      className={`${
        isShow
          ? 'hidden'
          : 'grid grid-cols-[160px_1fr_260px] bg-white py-4 relative'
      }`}
    >
      <div className="grid place-items-center">
        <div className="bg-pink-50/80 rounded-xl px-6 py-5">
          <CreditCard size={50} strokeWidth={1} className="text-pink-600/80" />
        </div>
      </div>
      <div className="">
        <h2 className="font-bold text-2xl">Start accepting online payments</h2>
        <p className="text-muted-foreground text-justify mt-2">
          Business are moving towards online payments as they&apos;re easy,
          secure and fast. Try them for your business today.
        </p>
      </div>

      <div className="grid place-items-center">
        <Button variant="pink">ENABLE</Button>
      </div>

      <Button
        className="absolute right-2 top-2 bg-transparent hover:bg-transparent"
        onClick={() => setIsShow(true)}
      >
        <X className="text-slate-700" strokeWidth={1} />
      </Button>
    </section>
  );
};
