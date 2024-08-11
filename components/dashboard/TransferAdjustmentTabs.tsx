import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PackageMinus, PackagePlus } from 'lucide-react';
import { FormAddInventory } from './FormAddInventory';
import { FormTransferInventory } from './FormTransferInventory';
import {
  getFormattedItems,
  getFormattedSuppliers,
  getFormattedWarehouses,
} from '@/app/(admin)/dashboard/inventory/_actions/get.adjustment';
import { FormWrapper } from '@/app/(admin)/dashboard/inventory/_components/FormWrapper';
import Link from 'next/link';

const tabs = [
  { label: 'Add Stock', value: 'addStock', Icon: PackagePlus },
  { label: 'Transfer Stock', value: 'minusStock', Icon: PackageMinus },
];

export const TransferAdjustmentTabs = async () => {
  const [warehouses, items, suppliers] = await Promise.all([
    getFormattedWarehouses(),
    getFormattedItems(),
    getFormattedSuppliers(),
  ]);

  if (!warehouses.length || !items.length || !suppliers.length) {
    return (
      <FormWrapper>
        <p>
          <Link
            href="/dashboard/inventory/warehouses"
            className="font-bold hover:text-xl transition-all duration-300 ease-in-out"
          >
            倉庫
          </Link>
          又は
          <Link
            href="/dashboard/inventory/items"
            className="font-bold hover:text-xl transition-all duration-300 ease-in-out"
          >
            商品
          </Link>
          又は
          <Link
            href="/dashboard/inventory/suppliers"
            className="font-bold hover:text-xl transition-all duration-300 ease-in-out"
          >
            サプライヤー
          </Link>
          の登録がありません。
        </p>
      </FormWrapper>
    );
  }

  return (
    <Tabs defaultValue="addStock" className="max-w-3xl mx-auto mt-4">
      <TabsList>
        {tabs.map(({ value, Icon, label }) => (
          <TabsTrigger key={value} value={value} className="w-36">
            <Icon className="pr-2" aria-hidden="true" />
            <span>{label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      <FormWrapper>
        {tabs.map(({ value }) => (
          <TabsContent key={value} value={value}>
            {value === 'addStock' ? (
              <FormAddInventory
                warehouses={warehouses}
                items={items}
                suppliers={suppliers}
              />
            ) : (
              <FormTransferInventory warehouses={warehouses} items={items} />
            )}
          </TabsContent>
        ))}
      </FormWrapper>
    </Tabs>
  );
};
