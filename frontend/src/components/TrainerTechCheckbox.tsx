import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

const TrainerTechCheckbox = ({
  value,
  technologies,
  setTechnologies,
}: {
  value: string;
  technologies: String[];
  setTechnologies: any;
}) => {
  function onChange() {
    console.log(technologies);

    if (technologies?.includes(value)) {
      const newTech = technologies.filter((tech) => tech !== value);
      setTechnologies(newTech);
    } else {
      const newTech = [...technologies, value];

      setTechnologies(newTech);
    }
  }

  return (
    <div className="flex items-center justify-start gap-3 cursor-pointer py-1">
      <Checkbox
        onCheckedChange={onChange}
        id={value}
        checked={technologies.includes(value)}
      />
      <Label htmlFor={value}>{value}</Label>
    </div>
  );
};

export default TrainerTechCheckbox;
