import FilterButton from "@/components/FilterButton";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import TrainersList from "@/components/TrainersList";
import { useAllTrainers } from "@/react-query/trainer";
import { Loader } from "lucide-react";

const Home = () => {
  const { allTrainers, loadingTrainers } = useAllTrainers();

  if (loadingTrainers)
    return (
      <div className="h-[70vh] w-full flex items-center justify-center">
        <Loader className="animate-spin h-8 w-8" />
      </div>
    );

  return (
    <div className="flex flex-col gap-10 items-center justify-center w-full pb-4">
      <div className="flex flex-col gap-6 max-w-[400px] w-full">
        <h1 className="text-3xl md:text-5xl font-[600] text-zinc-800 text-center">
          Search Trainers
        </h1>
        <SearchInput />
        <FilterButton />
      </div>
      <div className="overscroll-auto w-full">
        <TrainersList />
      </div>
      <Pagination totalPages={allTrainers?.totalPages} />
    </div>
  );
};

export default Home;
