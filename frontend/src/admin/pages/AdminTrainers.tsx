import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import TrainersList from "@/components/TrainersList";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAllTrainers } from "@/react-query/trainer";
import { Loader } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const AdminTrainers = () => {
  const { allTrainers, loadingTrainers } = useAllTrainers();
  const [open, setOpen] = useState(false);

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
      <div className="flex flex-col justify-center mb-5 items-center gap-4">
        <Button className="font-semibold text-lg" asChild>
          <NavLink to="/admin/trainers/add">Add Trainer</NavLink>
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="flex justify-center">
            <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Filter
            </div>
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
      <TrainersList isAdmin={true} />
      <div className="flex items-center justify-center mt-4">
        <Pagination totalPages={allTrainers?.totalPages} />
      </div>
    </div>
  );
};

export default AdminTrainers;
