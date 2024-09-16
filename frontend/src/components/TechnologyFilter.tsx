import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterTechnologies } from "@/constants";
import TechnologyCheckbox from "./TechnologyCheckbox";

const TechnologyFilter = () => {
  return (
    <div className="flex flex-col gap-3 items-center">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Technologies" />
        </SelectTrigger>
        <SelectContent className="max-h-[150px]">
          <div className="flex flex-col gap-2 overscroll-auto px-3 py-2">
            {filterTechnologies.map((tech) => (
              <TechnologyCheckbox value={tech} key={tech} />
            ))}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TechnologyFilter;
