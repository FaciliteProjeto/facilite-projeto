import { Search } from "lucide-react";
import { Input } from "./input";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  return (
    <div>
      <div className="flex gap-2 items-center border-2 justify-center bg-white rounded-md">
        <Search size={20} className="text-gray-950 pl-2" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-none ring-0 focus:ring-0 outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 flex-1"
        />
      </div>
    </div>
  );
}
