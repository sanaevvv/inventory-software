import { Loader2 } from 'lucide-react';

type Props = {
  size?: number;
};
const Loading = ({ size = 24 }: Props) => {
  return (
    <div className="flex justify-center">
      <Loader2 size={size} className="animate-spin" />
    </div>
  );
};

export default Loading;
