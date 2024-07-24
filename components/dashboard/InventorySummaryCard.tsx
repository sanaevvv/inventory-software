type Props = {
  title: string;
  number: number
}
export const InventorySummaryCard = ({ title, number }: Props) => {
  return (
    <li
      className="bg-white px-3 py-4 rounded-md hover:border-blue-400 border shadow"
    >
      <div className="flex items-center justify-between px-4">
        <p className="text-slate-700 text-sm">{title}</p>
        <h3 className="text-3xl font-semibold">{number}</h3>
      </div>
    </li>
  );
};
