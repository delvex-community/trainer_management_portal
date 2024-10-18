import { truncateString } from "@/lib/utils";
import { TrainerType } from "@/types";
import {
  CircleCheckBig,
  Edit,
  Mail,
  MonitorCheck,
  Phone,
  Pin,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import TrainerDeleteConfirmation from "./TrainerDeleteConfirmation";

const TrainerCard = ({
  trainer,
  isAdmin,
}: {
  trainer: TrainerType;
  isAdmin: boolean;
}) => {
  return (
    <div className="flex h-full w-full justify-center">
      <div className="w-full h-full border-[1px] border-gray-300 rounded-md shadow-md bg-gradient-to-br from-gray-50 to-gray-100/70 px-6 py-3 cursor-pointer flex flex-col justify-between max-w-[500px]">
        <Link
          to={`${
            isAdmin
              ? `/admin/trainers/${trainer._id}`
              : `/trainers/${trainer._id}`
          }`}
          className="text-zinc-800 flex items-center gap-5 justify-center flex-col"
        >
          <div className="flex flex-col md:flex-row items-center gap-4 w-full">
            <img
              src={trainer.avatar || "/images/user-profile.png"}
              alt={trainer.name}
              className="w-[4.5rem] h-[4.5rem] object-cover rounded-lg"
            />
            <div className="flex-1 flex flex-col w-full gap-2">
              <div className="flex items-center font-semibold gap-4 justify-between w-full">
                <h3 className="text-xl text-zinc-800">
                  {truncateString(trainer.name)}
                </h3>
                <span className="px-2 rounded-md bg-yellow-400 text-white text-md font-bold flex items-center gap-2">
                  {trainer.avgRating}
                  <Star className="fill-white h-3 w-3" />
                </span>
              </div>
              <span className="font-[400] italic flex items-center gap-1">
                <CircleCheckBig className="w-4 h-4" />
                {trainer.trainingCount} Trainings Delivered
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
            <span className=" flex items-center gap-2 font-[500] text-blue-600 w-fit py-1 px-2 rounded-md text-xs bg-blue-100">
              <Mail className="h-3 w-3" />
              {trainer.email}
            </span>
            <span className=" flex items-center gap-2 font-[500] text-blue-600 w-fit py-1 px-2 rounded-md text-xs bg-blue-100">
              <Pin className="h-3 w-3" />
              {trainer.location}
            </span>
            <span className=" flex items-center gap-2 font-[500] text-blue-600 w-fit py-1 px-2 rounded-md text-xs bg-blue-100">
              <MonitorCheck className="h-3 w-3" />
              {trainer.tech.length} Skills
            </span>
            <span className=" flex items-center gap-2 font-[500] text-blue-600 w-fit py-1 px-2 rounded-md text-xs bg-blue-100">
              <Phone className="h-3 w-3" />
              {trainer.contact}
            </span>
          </div>
        </Link>
        {isAdmin && (
          <div className="flex items-center justify-end w-full gap-4">
            <Link to={`/admin/trainers/${trainer._id}/update-profile`}>
              <Edit className="w-5 h-5 text-red-500 hover:scale-[1.20] duration-150" />
            </Link>

            <TrainerDeleteConfirmation trainerId={trainer._id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerCard;
