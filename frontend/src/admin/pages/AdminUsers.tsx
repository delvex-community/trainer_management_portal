import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import UsersList from "@/components/UsersList";
import { useAllUsers } from "@/react-query/user";
import { CirclePlus, Loader } from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminUsers = () => {
  const { allUsers, loadingUsers } = useAllUsers();

  if (loadingUsers)
    return (
      <div className="h-[70vh] w-full flex items-center justify-center">
        <Loader className="animate-spin h-8 w-8" />
      </div>
    );

  return (
    <div className="flex flex-col gap-6 items-center min-h-[86vh] sm:min-h-[78vh]">
      <div className="w-full max-w-[400px]">
        <SearchInput />
      </div>
      <div className="flex justify-center mb-5">
        <NavLink
          to="/admin/users/add"
          className="flex items-center gap-2 font-semibold text-lg px-4 py-2 rounded-md border-[1px] hover:border-gray-100 hover:bg-gray-100"
        >
          <CirclePlus className="w-5 h-5 text-blue-500" /> Add User
        </NavLink>
      </div>

      <div className="w-full flex-1">
        <UsersList />
      </div>

      <div className="flex items-center justify-center mt-4">
        <Pagination totalPages={allUsers?.totalPages} />
      </div>
    </div>
  );
};

export default AdminUsers;
