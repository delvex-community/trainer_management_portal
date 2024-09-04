import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import TrainersList from "@/components/TrainersList";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAllTrainers } from "@/react-query/trainer";

const Home = () => {
  const { allTrainers } = useAllTrainers();

  return (
    <div className="flex flex-col gap-10 items-center justify-center w-full max-h-screen">
      <div className="flex flex-col gap-6 max-w-[400px] w-full">
        <h1 className="text-4xl font-bold text-gray-900 text-center">
          Search Trainers
        </h1>
        <SearchInput />
        <Dialog>
          <DialogTrigger className="flex justify-center">
            <div className={buttonVariants()}>Filter</div>
          </DialogTrigger>
          <DialogContent className="max-w-[300px]">
            <DialogHeader>
              <DialogTitle className="text-xl text-center">
                Filter Trainers
              </DialogTitle>
              <div className="mt-6">
                <Filter />
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="overflow-auto w-full">
        <TrainersList />
      </div>
      <Pagination totalPages={allTrainers?.totalPages} />
    </div>
  );
};

export default Home;
