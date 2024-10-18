import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { toast } from "./ui/use-toast";
import { useAdminContext } from "@/context/AdminContext";

const AdminNavMenu = () => {
  const navigate = useNavigate();
  const { admin } = useAdminContext();

  const { mutate: signout } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(
        `${BACKEND_URL}/admin/logout`,
        {},
        { withCredentials: true }
      );

      return data;
    },
    onSuccess: () => {
      toast({
        title: "Logged Out",
        description: "Successfully logged out from your account",
      });
      navigate("/admin-auth", { replace: true });
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast({
          title: "Something went wrong",
          description: err.message,
          variant: "destructive",
        });
      }

      toast({
        title: "Something went wrong",
        description: "An error has occured, please try again later",
        variant: "destructive",
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <img
            src={"/images/user-profile.png"}
            referrerPolicy="no-referrer"
            alt="profile"
            className="aspect-square"
          />
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {/* {user?.name && <p className="font-medium">{user?.name}</p>} */}
            Admin
            {admin?.email && (
              <p className="w-[200px] truncate text-sm text-zinc-700">
                {admin?.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />
        {/* 
        <div className="flex flex-col space-y-1 mb-2">
        <DropdownMenuItem asChild>
          <Link to={`/profile/admin/${admin?._id}`}>Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to="/settings">Settings</Link>
        </DropdownMenuItem>
        </div> */}

        {/* <DropdownMenuSeparator /> */}

        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            signout();
          }}
          className="cursor-pointer"
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminNavMenu;
