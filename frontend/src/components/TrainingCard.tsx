import { formatDateTime } from "@/lib/utils";
import { useCurrentAdmin } from "@/react-query/admin";
import { TrainingType } from "@/types";
import {
  CircleDot,
  Dot,
  Edit,
  MapPinCheckIcon,
  TvMinimalPlay,
  Wifi,
  WifiOff,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import TrainingDeleteConfirmation from "./TrainingDeleteConfirmation";

type TrainingCardProps = {
  training: TrainingType;
};

const TrainingCard = ({ training }: TrainingCardProps) => {
  const { admin } = useCurrentAdmin();

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-3 w-full shadow-md px-6 py-3 rounded-md cursor-pointer max-w-[500px] border-[1px] border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100/70">
        <h3 className="font-[600] text-2xl">{training.title}</h3>
        <div className="flex items-center font-semibold text-blue-600">
          <span className="flex items-center gap-2 mr-2 bg-blue-100 px-2 py-1 rounded-md text-sm">
            {formatDateTime(training.startDate).dateOnly}
          </span>{" "}
          -{" "}
          <span className="flex items-center gap-2 ml-2 bg-blue-100 px-2 py-1 rounded-md text-sm">
            {formatDateTime(training.endDate).dateOnly}
          </span>
        </div>
        <div className="flex justify-between font-[500] text-zinc-800">
          <span
            className={`flex items-center gap-2 ${
              training.mode === "Offline" ? "text-yellow-500" : "text-green-500"
            }`}
          >
            {training.mode === "Offline" ? (
              <WifiOff className="w-4 h-4 text-yellow-500" />
            ) : (
              <Wifi className="w-4 h-4 text-green-500" />
            )}
            {training.mode}
          </span>
          <span className="flex items-center gap-2 bg-red-100 text-red-500 px-2 py-1 rounded-md text-sm">
            <MapPinCheckIcon className="w-4 h-4" />
            {training.location}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 font-[500] text-md">
            <img
              src={training.trainer.avatar || "/images/user-profile.png"}
              alt="trainer-profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            {training.trainer.name}
          </div>
          {admin && (
            <div className="flex items-center gap-3">
              <NavLink to={`/admin/trainings/update/${training._id}`}>
                <Edit className="text-blue-600 w-5 h-5 hover:scale-[1.20] duration-150" />
              </NavLink>

              <TrainingDeleteConfirmation trainingId={training._id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingCard;
