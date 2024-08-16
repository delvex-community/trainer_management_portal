import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import Sort from "@/components/Sort";
import TrainersList from "@/components/TrainersList";
import { useAllTrainers } from "@/react-query/trainer";

const Home = () => {
  const { allTrainers } = useAllTrainers();

  return (
    <div className="flex flex-col gap-10 items-center justify-center mt-24 w-full max-h-screen">
      <div className="flex flex-col gap-6 max-w-[400px] w-full">
        <h1 className="text-4xl font-bold text-gray-900 text-center">
          Search Trainers
        </h1>
        <SearchInput />
        <Sort />
      </div>
      <div className="overflow-auto">
        <TrainersList />
      </div>
      <Pagination totalPages={allTrainers?.totalPages} />
    </div>
  );
};

export default Home;
