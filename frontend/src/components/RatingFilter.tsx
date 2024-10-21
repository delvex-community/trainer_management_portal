import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Checkbox } from "./ui/checkbox";

const RatingFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  function onSelectRating(value: string) {
    if (value !== "none") {
      searchParams.set("rating", value);
    } else {
      searchParams.delete("rating");
    }
    setSearchParams(searchParams);
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["all-trainers"] });
    }, 100);
  }

  function onLeastChange(value: boolean) {
    if (value) {
      searchParams.set("atLeast", "true");
    } else {
      searchParams.delete("atLeast");
    }
    setSearchParams(searchParams);
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["all-trainers"] });
    }, 100);
  }

  function onMostChange(value: boolean) {
    if (value) {
      searchParams.set("atMost", "true");
    } else {
      searchParams.delete("atMost");
    }
    setSearchParams(searchParams);
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["all-trainers"] });
    }, 100);
  }

  return (
    <div className="flex flex-col gap-3 items-center">
      <Select
        onValueChange={(value) => onSelectRating(value)}
        value={searchParams?.get("rating") || ""}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">Default</SelectItem>
          <SelectItem value="1">
            <div className="flex items-center gap-2 font-[500]">
              1 <Star className="h-4 w-4 fill-black" />
            </div>
          </SelectItem>
          <SelectItem value="2">
            <div className="flex items-center gap-2 font-[500]">
              2 <Star className="h-4 w-4 fill-black" />
            </div>
          </SelectItem>
          <SelectItem value="3">
            <div className="flex items-center gap-2 font-[500]">
              3 <Star className="h-4 w-4 fill-black" />
            </div>
          </SelectItem>
          <SelectItem value="4">
            <div className="flex items-center gap-2 font-[500]">
              4 <Star className="h-4 w-4 fill-black" />
            </div>
          </SelectItem>
          <SelectItem value="5">
            <div className="flex items-center gap-2 font-[500]">
              5 <Star className="h-4 w-4 fill-black" />
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      <div className="flex items-center gap-4 w-full font-semibold text-gray-700 text-sm">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={searchParams?.get("atLeast") === "true"}
            onCheckedChange={(value: boolean) => onLeastChange(value)}
          />
          At Least
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={searchParams?.get("atMost") === "true"}
            onCheckedChange={(value: boolean) => onMostChange(value)}
          />{" "}
          At Most
        </div>
      </div>
    </div>
  );
};

export default RatingFilter;
