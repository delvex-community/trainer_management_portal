import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import TrainersList from "@/components/TrainersList";
import { Button } from "@/components/ui/button";
import { useAllTrainers } from "@/react-query/trainer";
import { Loader } from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminTrainers = () => {
  const { allTrainers, loadingTrainers } = useAllTrainers();

  if (loadingTrainers)
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
          <NavLink to="/admin/trainers/add">Add Trainer</NavLink>
        </Button>
      </div>
      <TrainersList isAdmin={true} />
      <div className="flex items-center justify-center mt-4">
        <Pagination totalPages={allTrainers?.totalPages} />
      </div>
    </div>
  );
};

export default AdminTrainers;
