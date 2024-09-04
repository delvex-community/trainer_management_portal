import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar } from "./ui/avatar";
import { useAuthContext } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { toast } from "./ui/use-toast";

const UserNav = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  const { mutate: signout } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(
        `${BACKEND_URL}/user/logout`,
        {},
        { withCredentials: true }
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast({
        title: "Logged Out",
        description: "Successfully logged out from your account",
      });
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
            src={user?.avatar || "/icons/profile-placeholder.svg"}
            referrerPolicy="no-referrer"
            alt="profile"
            className="aspect-square"
          />
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user?.name && <p className="font-medium">{user?.name}</p>}
            {user?.email && (
              <p className="w-[200px] truncate text-sm text-zinc-700">
                {user?.email}
              </p>
            )}
          </div>
        </div>

        {/* <DropdownMenuSeparator /> */}

        {/* <DropdownMenuItem asChild>
          <Link to={`/profile/${user?._id}`}>Profile</Link>
        </DropdownMenuItem> */}

        <DropdownMenuSeparator />

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

export default UserNav;
