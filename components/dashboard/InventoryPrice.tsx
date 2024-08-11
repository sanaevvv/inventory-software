type Props = {
  price: number;
};
export const InventoryPrice = ({ price }: Props) => {
  return price ? `¥${price.toLocaleString()}` : 'N/A';
};
