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
import { useState } from "react";

const Home = () => {
  const { allTrainers } = useAllTrainers();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-10 items-center justify-center w-full max-h-screen">
      <div className="flex flex-col gap-6 max-w-[400px] w-full">
        <h1 className="text-4xl font-bold text-gray-900 text-center">
          Search Trainers
        </h1>
        <SearchInput />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="flex justify-center">
            <div className={buttonVariants()}>Filter</div>
          </DialogTrigger>
          <DialogContent className="max-w-[600px] overflow-y-auto max-h-screen">
            <DialogHeader>
              <DialogTitle className="text-xl text-center ">
                Filter Trainers
              </DialogTitle>
              <div className="mt-6">
                <Filter setOpen={setOpen} />
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="overscroll-auto w-full">
        <TrainersList />
      </div>
      <Pagination totalPages={allTrainers?.totalPages} />
    </div>
  );
};

export default Home;
