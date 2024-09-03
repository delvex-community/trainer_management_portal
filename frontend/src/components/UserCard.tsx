import { UserType } from "@/types";
import { Edit, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import UserDeleteConfirmation from "./UserDeleteConfirmation";

const UserCard = ({ user }: { user: UserType }) => {
  return (
    <div className="w-full border-2 rounded-md bg-white shadow-md px-6 py-3 cursor-pointer  ">
      <div className="flex items-center gap-6 flex-wrap justify-center sm:justify-start">
        <img
          src={user.avatar || "/icons/profile-placeholder.svg"}
          alt={user.name}
          className="w-20 h-20 object-cover rounded-full"
        />
        <div className="text-gray-800 flex flex-col gap-2 font-semibold">
          <div className="flex items-center gap-4">
            <h3 className="text-xl">{user.name}</h3>
          </div>

          <span className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            {user.email}
          </span>
          <span className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            {user.contact}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between w-full mt-6">
        <Button
          variant="secondary"
          className="text-md flex items-center gap-2"
          asChild
        >
          <Link to={`/admin/users/${user._id}/update-user`}>
            <Edit />
            Edit
          </Link>
        </Button>

        <UserDeleteConfirmation userId={user._id} />
      </div>
    </div>
  );
};

export default UserCard;
