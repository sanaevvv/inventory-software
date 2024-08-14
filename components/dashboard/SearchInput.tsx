import { Search } from 'lucide-react';
import { Input } from '../ui/input';

export const SearchInput = () => {
  return (
    <form className="relative">
      <Search className="absolute left-2 h-full stroke-gray-400 stroke-1" />
      <Input type="search" className="pl-10" placeholder="Search in Customers..." />
    </form>
  );
}
