import { TrainerType } from "@/types";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Edit, Mail, Phone, Star } from "lucide-react";
import TrainerDeleteConfirmation from "./TrainerDeleteConfirmation";
import { truncateString } from "@/lib/utils";

const TrainerCard = ({
  trainer,
  isAdmin,
}: {
  trainer: TrainerType;
  isAdmin: boolean;
}) => {
  return (
    <div className="flex h-full w-full justify-center">
      <div className="w-full h-full border-2 rounded-md shadow-sm bg-white px-6 py-3 cursor-pointer flex flex-col justify-between max-w-[500px] hover:shadow-md">
        <Link
          to={`${
            isAdmin
              ? `/admin/trainers/${trainer._id}`
              : `/trainers/${trainer._id}`
          }`}
          className="flex items-center gap-6 justify-center flex-col md:flex-row"
        >
          <img
            src={trainer.avatar || "/icons/profile-placeholder.svg"}
            alt={trainer.name}
            className="w-20 h-20 object-cover rounded-full"
          />
          <div className="text-gray-800 flex flex-col gap-2 font-semibold flex-1">
            <div className="flex items-center gap-4 justify-between w-full">
              <h3 className="text-xl text-zinc-800">
                {truncateString(trainer.name)}
              </h3>
              <span className="text-yellow-500 text-md font-bold flex items-center gap-2">
                {trainer.avgRating}
                <Star className="fill-yellow-500 h-4 w-4" />
              </span>
            </div>

            <span className="flex items-center gap-2 text-sm text-zinc-800">
              <Mail className="h-4 w-4" />
              {trainer.email}
            </span>
            <span className="flex items-center gap-2 text-sm text-zinc-800">
              <Phone className="h-4 w-4" />
              {trainer.contact}
            </span>
          </div>
        </Link>
        {isAdmin && (
          <div className="flex items-center justify-between w-full mt-6 gap-6">
            <Button
              variant="secondary"
              className="text-md flex items-center gap-2"
              asChild
            >
              <Link to={`/admin/trainers/${trainer._id}/update-profile`}>
                <Edit />
                Edit
              </Link>
            </Button>

            <TrainerDeleteConfirmation trainerId={trainer._id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerCard;
