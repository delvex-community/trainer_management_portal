import { TrainerType } from "@/types";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const TrainerCard = ({ trainer }: { trainer: TrainerType }) => {
  return (
    <Link
      to={`/admin/trainers/${trainer._id}`}
      className="flex items-center gap-6 border-2 border-gray-800 rounded-md bg-gray-800 px-6 py-3 w-fit cursor-pointer flex-wrap"
    >
      <img
        src={trainer.avatar}
        alt={trainer.name}
        className="w-20 h-20 object-cover rounded-full border-white border-2"
      />
      <div className="text-white flex flex-col gap-2">
        <h3 className="text-xl font-semibold">{trainer.name}</h3>
        <p className="">{trainer.email}</p>
        <p className="">{trainer.contact}</p>
      </div>
      <div className="flex md:flex-col gap-4">
        <Button variant="secondary" className="text-md">
          Edit
        </Button>
        <Button variant="destructive" className="text-md">
          Delete
        </Button>
      </div>
    </Link>
  );
};

export default TrainerCard;
