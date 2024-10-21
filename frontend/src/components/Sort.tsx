import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const Sort = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  function onSelectSort(value: string) {
    if (value !== "none") {
      searchParams.set("sort", value);
    } else {
      searchParams.delete("sort");
    }
    setSearchParams(searchParams);
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["all-trainers"] });
    }, 100);
  }

  function onSelectOrder(value: string) {
    if (value !== "none") {
      searchParams.set("order", value);
    } else {
      searchParams.delete("order");
    }
    setSearchParams(searchParams);
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["all-trainers"] });
    }, 100);
  }

  return (
    <div className="flex items-center justify-center gap-3 w-fit">
      <Select
        onValueChange={(value) => onSelectSort(value)}
        value={searchParams.get("sort") || ""}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent className="font-[500]">
          <SelectItem value="none">Default</SelectItem>
          <SelectItem value="rating">Rating</SelectItem>
          <SelectItem value="name">Name</SelectItem>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => onSelectOrder(value)}
        value={searchParams.get("order") || ""}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Order" />
        </SelectTrigger>
        <SelectContent className="font-[500]">
          <SelectItem value="none">Default</SelectItem>
          <SelectItem value="asc">
            <ArrowUp className="h-4 w-4" />
          </SelectItem>
          <SelectItem value="desc">
            <ArrowDown className="h-4 w-4" />
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sort;
