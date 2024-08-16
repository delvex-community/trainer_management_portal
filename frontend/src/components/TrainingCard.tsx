import { formatDateTime } from "@/lib/utils";
import { TrainingType } from "@/types";
import { CalendarX2, Edit, Laptop, Trash2 } from "lucide-react";

type TrainingCardProps = {
  training: TrainingType;
};

const TrainingCard = ({ training }: TrainingCardProps) => {
  return (
    <div className="flex flex-col gap-3 w-full shadow-md px-4 py-3 rounded-md cursor-pointer">
      <h3 className="font-semibold text-2xl">{training.title}</h3>
      <div className="flex items-center justify-between font-semibold text-blue-600">
        <span className="flex items-center gap-2">
          <CalendarX2 />
          {formatDateTime(training.date).dateOnly}
        </span>
        <span className="flex items-center gap-2">
          <Laptop />
          {training.mode}
        </span>
      </div>
      <div className="flex justify-end">
        <span className="text-lg font-semibold text-gray-500">
          {training.location}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 font-bold text-md">
          <img
            src={training.trainer.avatar}
            alt="trainer-profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          {training.trainer.name}
        </div>
        <div className="flex items-center gap-3">
          <Edit className="text-violet-600" />
          <Trash2 className="text-red-600" />
        </div>
      </div>
    </div>
  );
};

export default TrainingCard;
