'use client';

import { usePathname } from 'next/navigation';
import NewHeader from './NewHeader';
import { FixedHeader } from './FixedHeader';

export const InventoryHeader = () => {
  const pathname = usePathname();
  const path = '/dashboard/inventory';

  const routePatterns: { [key: string]: RegExp } = {
    editBrand: new RegExp(`^${path}/brands/\\d+/edit$`),
    editItem: new RegExp(`^${path}/items/\\d+/edit$`),
    editCategory: new RegExp(`^${path}/categories/\\d+/edit$`),
    editWarehouse: new RegExp(`^${path}/warehouses/\\d+/edit$`),
    editUnit: new RegExp(`^${path}/units/\\d+/edit$`),
    editSupplier: new RegExp(`^${path}/suppliers/\\d+/edit$`),
    editAddAdjustment: new RegExp(`^${path}/adjustments/add/\\d+/edit$`),
    editTransferAdjustment: new RegExp(`^${path}/adjustments/transfer/\\d+/edit$`),

    newBrand: new RegExp(`^${path}/brands/new$`),
    newItem: new RegExp(`^${path}/items/new$`),
    newCategory: new RegExp(`^${path}/categories/new$`),
    newWarehouse: new RegExp(`^${path}/warehouses/new$`),
    newUnit: new RegExp(`^${path}/units/new$`),
    newSupplier: new RegExp(`^${path}/suppliers/new$`),
    newAdjustment: new RegExp(`^${path}/adjustments/new$`),

    brands: new RegExp(`^${path}/brands$`),
    allItems: new RegExp(`^${path}/items$`),
    categories: new RegExp(`^${path}/categories$`),
    warehouses: new RegExp(`^${path}/warehouses$`),
    units: new RegExp(`^${path}/units$`),
    suppliers: new RegExp(`^${path}/suppliers$`),
    adjustments: new RegExp(`^${path}/adjustments$`),
  };

  const headerTexts: { [key: string]: string } = {
    editBrand: 'Edit Brand',
    editItem: 'Edit Item',
    editCategory: 'Edit Category',
    editUnit: 'Edit Unit',
    editSupplier: 'Edit Supplier',
    editWarehouse: 'Edit Warehouse',
    editAddAdjustment: 'Edit AddAdjustment',
    editTransferAdjustment: 'Edit TransferAdjustment',

    newBrand: 'New Brand',
    newCategory: 'New Category',
    newWarehouse: 'New Warehouse',
    newAdjustment: 'New Adjustment',
    newItem: 'New Item',
    newUnit: 'New Unit',
    newSupplier: 'New Supplier',

    allItems: 'All Items',
    categories: 'Categories',
    brands: 'Brands',
    warehouses: 'Warehouses',
    units: 'Units',
    suppliers: 'Suppliers',
    adjustments: 'Adjustments',
  };

  // マッチするキーが見つかった場合、そのキーが matchedRoute に代入
  const matchedRoute = Object.keys(routePatterns).find((key) =>
    routePatterns[key].test(pathname)
  );

  const headerText = matchedRoute ? headerTexts[matchedRoute] : 'ALL Items';

  return (
    <>
      {pathname.includes('new') || pathname.includes('edit') ? (
        <NewHeader headerText={headerText} />
      ) : (
        <FixedHeader headerText={headerText} />
      )}
    </>
  );
};
