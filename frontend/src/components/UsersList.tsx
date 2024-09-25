import { useAllUsers } from "@/react-query/user";
import { UserType } from "@/types";
import Loader from "./Loader";
import UserCard from "./UserCard";

const UsersList = () => {
  const { allUsers, loadingUsers } = useAllUsers();

  return (
    <>
      {loadingUsers ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-h-[70vh] overflow-auto">
          {allUsers.data.map((user: UserType) => (
            <div className="w-full" key={user._id}>
              <UserCard user={user} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UsersList;
