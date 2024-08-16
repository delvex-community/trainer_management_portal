import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllTrainers } from "@/react-query/trainer";

type TrainerDropdownProps = {
  onChangeHandler: () => void;
  value: string;
};

const TrainerDropdown = ({ onChangeHandler, value }: TrainerDropdownProps) => {
  const { allTrainers } = useAllTrainers();

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Trainer" />
      </SelectTrigger>
      <SelectContent>
        {allTrainers &&
          allTrainers.data.length > 0 &&
          allTrainers.data.map((trainer: { _id: string; name: string }) => (
            <SelectItem
              key={trainer._id}
              value={trainer._id}
              className="select-item p-regular-14"
            >
              {trainer.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default TrainerDropdown;
