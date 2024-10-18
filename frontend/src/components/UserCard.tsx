import { UserType } from "@/types";
import { Edit, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import UserDeleteConfirmation from "./UserDeleteConfirmation";

const UserCard = ({ user }: { user: UserType }) => {
  return (
    <div className="flex flex-col gap-3 w-full shadow-md px-4 py-3 rounded-md cursor-pointer max-w-[500px] border-[1px] border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100/70">
      <div className="flex items-center gap-6 justify-center sm:justify-start">
        <img
          src={user.avatar || "/images/user-profile.png"}
          alt={user.name}
          className="w-[4.5rem] h-[4.5rem] object-cover rounded-2xl"
        />
        <div className="text-zinc-800 flex flex-col gap-2 font-semibold">
          <h3 className="text-xl">{user.name}</h3>

          <span className="flex items-center gap-2 font-[500] text-red-600 w-fit py-1 px-2 rounded-md text-xs bg-red-100">
            <Mail className="h-4 w-4" />
            {user.email}
          </span>
          <span className="flex items-center gap-2 font-[500] text-red-600 w-fit py-1 px-2 rounded-md text-xs bg-red-100">
            <Phone className="h-4 w-4" />
            {user.contact}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 w-full">
        <Link to={`/admin/users/${user._id}/update-user`}>
          <Edit className="w-5 h-5 text-red-500 hover:scale-[1.20] duration-150" />
        </Link>

        <UserDeleteConfirmation userId={user._id} />
      </div>
    </div>
  );
};

export default UserCard;
