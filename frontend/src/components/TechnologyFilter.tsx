import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllTechnologies } from "@/react-query/technology";
import TechnologyCheckbox from "./TechnologyCheckbox";

const TechnologyFilter = () => {
  const { allTechnologies } = useAllTechnologies();

  return (
    <div className="flex flex-col gap-3 items-center">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Technologies" />
        </SelectTrigger>
        <SelectContent className="max-h-[150px]">
          <div className="flex flex-col gap-2 overscroll-auto px-3 py-2">
            {allTechnologies?.data?.map((tech: { name: string }) => (
              <TechnologyCheckbox value={tech.name} key={tech.name} />
            ))}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TechnologyFilter;
