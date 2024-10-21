import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BACKEND_URL } from "@/config";
import { decryptPassword } from "@/lib/utils";
import { UserType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Edit, Mail, Phone, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import UserDeleteConfirmation from "./UserDeleteConfirmation";

const UserCard = ({ user }: { user: UserType }) => {
  const decryptedPassword = decryptPassword(user?.password || "");

  const [openPassword, setOpenPassword] = useState(false);
  const [input, setInput] = useState(decryptedPassword || "");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user.password) {
      setInput(decryptPassword(user.password));
    }
  }, [user]);

  const { mutate: updateUserPassword, isPending: isUpdating } = useMutation({
    mutationFn: async () => {
      const data = await axios.patch(
        `${BACKEND_URL}/user/update-password/${user._id}`,
        { newPassword: input }
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
      setOpenPassword(false);
      toast({
        title: "Updated Successfully",
        description: "User's password has been changed.",
      });
    },
    onError: () => {
      return toast({
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    },
  });

  function onUpdate() {
    if (!input) return;
    updateUserPassword();
  }

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
          <span className="flex items-center gap-2 font-[500] text-blue-600 w-fit py-1 px-2 rounded-md text-xs bg-blue-100">
            <Phone className="h-4 w-4" />
            {user.contact}
          </span>
          <span className="flex items-center gap-2 font-[500] text-blue-600 w-fit py-1 px-2 rounded-md text-xs bg-blue-100">
            <Mail className="h-4 w-4" />
            {user.email}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center sm:justify-between gap-4 w-full">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpenPassword(true);
          }}
          className="font-[500] flex items-center gap-2 text-sm mt-2 text-white hover:underline bg-red-600 hover:bg-red-500 px-2 py-1 rounded-md"
        >
          <ShieldAlert className="w-4 h-4" /> Password
        </button>
        <div className="flex items-center gap-4">
          <Link to={`/admin/users/${user._id}/update-user`}>
            <Edit className="w-5 h-5 text-blue-500 hover:scale-[1.20] duration-150" />
          </Link>

          <UserDeleteConfirmation userId={user._id} />
        </div>
      </div>
      <Dialog open={openPassword} onOpenChange={setOpenPassword}>
        <DialogContent className="max-w-[350px]">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {user.name.split(" ")[0]}'s Password
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col  gap-4">
            <Input
              placeholder="Enter password"
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={onUpdate} disabled={isUpdating}>
              {isUpdating ? <Loader /> : "Update Password"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserCard;
