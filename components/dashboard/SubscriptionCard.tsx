import { Separator } from '../ui/separator';
import Link from 'next/link';

export const SubscriptionCard = () => {
  return (
    <div className="p-2 mx-2 bg-slate-900 rounded-sm">
      <p className="border-l-2 border-pink-600 pl-2">
        Your Premium plan&apos;s trial expires in{' '}
        <span className="text-pink-600 font-bold">13 days.</span>
      </p>
      <Separator className="my-2 bg-muted-foreground" />

      <ul className="flex items-center">
        <li className="flex-1">
          <Link
            href=""
            className="px-1 py-1.5 font-semibold text-sm hover:bg-pink-100 hover:text-pink-700 rounded-sm"
          >
            Change Plan
          </Link>
        </li>
        <Separator orientation="vertical" className="h-5 bg-muted-foreground" />
        <li className="flex-1">
          <Link
            href=""
            className="grid justify-center px-1 py-1.5 font-semibold text-sm hover:bg-pink-100 hover:text-pink-700 rounded-sm"
          >
            Upgrade
          </Link>
        </li>
      </ul>
    </div>
  );
}
