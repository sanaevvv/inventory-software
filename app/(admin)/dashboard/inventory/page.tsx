import { ItemCard } from "@/components/dashboard/ItemCard"
import { Barcode, Container, Factory, Group, LayoutList, PackagePlus, Vegan } from "lucide-react"

const items = [
  {
    title: 'Items',
    body: 'Create standalone items and services that you buy and sell',
    href: '/dashboard/inventory/items/new',
    buttonText: 'New Item',
    icon: Barcode,
    enabled: false,
  },
  {
    title: 'Categories',
    body: 'Create standalone items and services that you buy and sell',
    href: '/dashboard/inventory/items/new',
    buttonText: 'New Category',
    icon: LayoutList,
    enabled: true,
  },
  {
    title: 'Brands',
    body: 'Create standalone items and services that you buy and sell',
    href: '/dashboard/inventory/brands/new',
    buttonText: 'New Brand',
    icon: Vegan,
    enabled: false,
  },
  {
    title: 'Warehouses',
    body: 'Create standalone items and services that you buy and sell',
    href: '/dashboard/inventory/warehouses/new',
    buttonText: 'New Warehouse',
    icon: Factory,
    enabled:true,
  },
  {
    title: 'Units',
    body: 'Create standalone items and services that you buy and sell',
    href: '/dashboard/inventory/units/new',
    buttonText: 'New Unit',
    icon: Group,
    enabled: true,
  },
  {
    title: 'Suppliers',
    body: 'Create standalone items and services that you buy and sell',
    href: '/dashboard/inventory/suppliers/new',
    buttonText: 'New Supplier',
    icon: Container,
    enabled: true
  },
  {
    title: 'Inventory Adjustments',
    body: 'Create standalone items and services that you buy and sell',
    href: '/dashboard/inventory/adjustments/new',
    buttonText: 'New Adjustment',
    icon: PackagePlus,
    enabled: true
  },
];

const RegisterPage = () => {
  return (
    <ul className="grid grid-cols-3 gap-4 container mt-6">
      {items.map(({ title, body, href, buttonText, icon, enabled }) => (
        <ItemCard
          key={title}
          title={title}
          body={body}
          href={href}
          buttonText={buttonText}
          icon={icon}
          enabled={enabled}
        />
      ))}
    </ul>
  );
}

export default RegisterPage
