import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import TrainingList from "@/components/TrainingList";
import { Button } from "@/components/ui/button";
import { useAllTrainings } from "@/react-query/training";
import { Loader } from "lucide-react";
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
    <div className="flex flex-col gap-6 items-center">
      <div className="w-full max-w-[400px]">
        <SearchInput />
      </div>
      <div className="flex justify-center mb-5">
        <Button className="font-semibold text-lg" asChild>
          <NavLink to="/admin/trainings/add">Add Training</NavLink>
        </Button>
      </div>

      <TrainingList trainings={allTrainings.data} />

      <div className="flex items-center justify-center mt-4">
        <Pagination totalPages={1} />
      </div>
    </div>
  );
};

export default AdminTrainings;
