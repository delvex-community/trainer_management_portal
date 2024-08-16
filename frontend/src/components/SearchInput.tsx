import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

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
      }, 100);
    }, 300);

    return () => clearTimeout(delayDebounceSearch);
  }, [query]);

  return (
    <Input
      className="form-input rounded-full pl-4 max-w-4xl"
      placeholder="Type here..."
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default SearchInput;
