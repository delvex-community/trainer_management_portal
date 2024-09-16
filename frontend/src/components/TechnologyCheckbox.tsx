import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

const TechnologyCheckbox = ({ value }: { value: string }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const [selectedTech, setSelectedTech] = useState<String[]>([]);

  useEffect(() => {
    const values = searchParams.getAll("tech")
      ? searchParams.getAll("tech")
      : [];

    if (values) {
      setSelectedTech(values);
    }
  }, [searchParams]);

  function onChange() {
    const params = searchParams.getAll("tech");

    if (params.includes(value)) {
      searchParams.delete("tech", value);
    } else {
      searchParams.append("tech", value);
    }

    setSearchParams(searchParams);
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["all-trainers"] });
    }, 100);
  }

  return (
    <div className="flex items-center justify-start gap-3 cursor-pointer py-1">
      <Checkbox
        checked={selectedTech.includes(value)}
        onCheckedChange={onChange}
        id={value}
      />
      <Label htmlFor={value}>{value}</Label>
    </div>
  );
};

export default TechnologyCheckbox;
