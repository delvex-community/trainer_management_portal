import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import TrainingList from "@/components/TrainingList";
import { useAllTrainings } from "@/react-query/training";
import { Loader } from "lucide-react";

const Trainings = () => {
  const { allTrainings, isLoading } = useAllTrainings();

  if (isLoading)
    return (
      <div className="h-[70vh] w-full flex items-center justify-center">
        <Loader className="animate-spin h-8 w-8" />
      </div>
    );

  return (
    <div className="flex flex-col gap-6 items-center min-h-[86vh] sm:min-h-[82vh]">
      <h1 className="text-3xl md:text-4xl font-[600] text-zinc-800 text-center">
        Search Trainings
      </h1>
      <div className="w-full max-w-[400px]">
        <SearchInput />
      </div>

      <div className="overscroll-auto w-full flex-1 mt-4">
        <TrainingList trainings={allTrainings.data} />
      </div>

      <div className="flex items-center justify-center mt-4">
        <Pagination totalPages={allTrainings.totalPages} />
      </div>
    </div>
  );
};

export default Trainings;
