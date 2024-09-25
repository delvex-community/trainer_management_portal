import { formatDateTime } from "@/lib/utils";
import { TrainingType } from "@/types";
import { Edit, Laptop } from "lucide-react";
import TrainingDeleteConfirmation from "./TrainingDeleteConfirmation";
import { NavLink } from "react-router-dom";

type TrainingCardProps = {
  training: TrainingType;
};

const TrainingCard = ({ training }: TrainingCardProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-3 w-full shadow-md px-4 py-3 rounded-md cursor-pointer max-w-[500px] border-2">
        <h3 className="font-semibold text-2xl">{training.title}</h3>
        <div className="flex items-center font-semibold text-blue-600">
          <span className="flex items-center gap-2 mr-2">
            {formatDateTime(training.startDate).dateOnly}
          </span>{" "}
          -{" "}
          <span className="flex items-center gap-2 ml-2">
            {formatDateTime(training.endDate).dateOnly}
          </span>
        </div>
        <div className="flex justify-between font-semibold text-gray-600">
          <span className="flex items-center gap-2">
            <Laptop />
            {training.mode}
          </span>
          <span className="text-lg  ">{training.location}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 font-bold text-md">
            <img
              src={training.trainer.avatar || "/icons/profile-placeholder.svg"}
              alt="trainer-profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            {training.trainer.name}
          </div>
          <div className="flex items-center gap-3">
            <NavLink to={`/admin/trainings/update/${training._id}`}>
              <Edit className="text-violet-600" />
            </NavLink>

            <TrainingDeleteConfirmation trainingId={training._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCard;
