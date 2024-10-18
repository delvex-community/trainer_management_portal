import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    const delayDebounceSearch = setTimeout(() => {
      if (query) {
        searchParams.set("query", query);
        setSearchParams(searchParams);
      } else {
        searchParams.delete("query");
        setSearchParams(searchParams);
      }
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["all-trainers"] });
        queryClient.invalidateQueries({ queryKey: ["all-users"] });
        queryClient.invalidateQueries({ queryKey: ["all-technologies"] });
        queryClient.invalidateQueries({ queryKey: ["all-trainings"] });
      }, 100);
    }, 300);

    return () => clearTimeout(delayDebounceSearch);
  }, [query]);

  return (
    <div className="relative">
      <Search className="text-blue-400 absolute top-[50%] translate-y-[-50%] left-2 h-5 w-5" />
      <Input
        className="form-input rounded-lg border-[1px] border-blue-300 bg-blue-100/30 pl-10 max-w-4xl placeholder:text-zinc-700 text-zinc-900 text-lg"
        placeholder="Type here..."
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
