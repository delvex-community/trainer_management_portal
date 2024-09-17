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
import { techRatingLabels } from "@/constants";

const TechRatingFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  function onSelectLabel(value: string) {
    if (value !== "none") {
      searchParams.set("techRatingLabel", value);
    } else {
      searchParams.delete("techRatingLabel");
    }
    setSearchParams(searchParams);
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["all-trainers"] });
    }, 100);
  }

  function onSelectRating(value: string) {
    if (value !== "none") {
      searchParams.set("techRating", value);
    } else {
      searchParams.delete("techRating");
    }
    setSearchParams(searchParams);
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["all-trainers"] });
    }, 100);
  }

  function onLeastChange(value: boolean) {
    if (value) {
      searchParams.set("atLeastTechRating", "true");
    } else {
      searchParams.delete("atLeastTechRating");
    }
    setSearchParams(searchParams);
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["all-trainers"] });
    }, 100);
  }

  function onMostChange(value: boolean) {
    if (value) {
      searchParams.set("atMostTechRating", "true");
    } else {
      searchParams.delete("atMostTechRating");
    }
    setSearchParams(searchParams);
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["all-trainers"] });
    }, 100);
  }

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="flex items-center gap-3">
        <Select
          onValueChange={(value) => onSelectLabel(value)}
          value={searchParams?.get("techRatingLabel") || ""}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Label" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Default</SelectItem>
            {techRatingLabels.map((rating, index) => (
              <SelectItem value={`rating${index + 1}`}>
                <div className="flex items-center gap-2 font-bold">
                  {rating}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => onSelectRating(value)}
          value={searchParams?.get("techRating") || ""}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Default</SelectItem>
            <SelectItem value="1">
              <div className="flex items-center gap-2 font-bold">
                1 <Star className="h-4 w-4 fill-black" />
              </div>
            </SelectItem>
            <SelectItem value="2">
              <div className="flex items-center gap-2 font-bold">
                2 <Star className="h-4 w-4 fill-black" />
              </div>
            </SelectItem>
            <SelectItem value="3">
              <div className="flex items-center gap-2 font-bold">
                3 <Star className="h-4 w-4 fill-black" />
              </div>
            </SelectItem>
            <SelectItem value="4">
              <div className="flex items-center gap-2 font-bold">
                4 <Star className="h-4 w-4 fill-black" />
              </div>
            </SelectItem>
            <SelectItem value="5">
              <div className="flex items-center gap-2 font-bold">
                5 <Star className="h-4 w-4 fill-black" />
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-center gap-4 w-full font-semibold text-gray-700 text-sm">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={searchParams?.get("atLeastTechRating") === "true"}
            onCheckedChange={(value: boolean) => onLeastChange(value)}
          />
          At Least
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={searchParams?.get("atMostTechRating") === "true"}
            onCheckedChange={(value: boolean) => onMostChange(value)}
          />{" "}
          At Most
        </div>
      </div>
    </div>
  );
};

export default TechRatingFilter;
