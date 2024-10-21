import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import TrainingList from "@/components/TrainingList";
import { useAllTrainings } from "@/react-query/training";
import { CirclePlus, Loader } from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminTrainings = () => {
  const { allTrainings, isLoading } = useAllTrainings();

  if (isLoading)
    return (
      <div className="h-[70vh] w-full flex items-center justify-center">
        <Loader className="animate-spin h-8 w-8" />
      </div>
    );

  return (
    <div className="flex flex-col gap-6 items-center min-h-[86vh] sm:min-h-[82vh]">
      <div className="w-full max-w-[400px]">
        <SearchInput />
      </div>
      <div className="flex justify-center mb-5">
        <NavLink
          to="/admin/trainings/add"
          className="flex items-center gap-2 font-semibold text-lg px-4 py-2 rounded-md border-[1px] hover:border-gray-100 hover:bg-gray-100"
        >
          <CirclePlus className="w-5 h-5 text-blue-500" /> Add Training
        </NavLink>
      </div>
      <div className="overscroll-auto w-full flex-1">
        <TrainingList trainings={allTrainings.data} />
      </div>

      <div className="flex items-center justify-center mt-4">
        <Pagination totalPages={allTrainings.totalPages} />
      </div>
    </div>
  );
};

export default AdminTrainings;
