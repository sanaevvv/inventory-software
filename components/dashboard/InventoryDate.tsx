type Props = {
  date: Date;
};
export const InventoryDate = ({ date }: Props) => {
  return date
    ? new Intl.DateTimeFormat('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Tokyo',
      }).format(date)
    : 'N/A';
};
