import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ListFilter } from "lucide-react";
import { useState } from "react";
import Filter from "./Filter";

const FilterButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex justify-center" asChild>
        <div>
          <button className="flex items-center gap-2 font-semibold text-lg px-4 py-2 rounded-md border-[1px] hover:border-gray-100 hover:bg-gray-100">
            <ListFilter className="text-blue-500 w-5 h-5" />
            Filter
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[600px] overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle className="text-2xl text-zinc-800 font-semibold text-center ">
            Filter Trainers
          </DialogTitle>
          <div className="mt-6">
            <Filter setOpen={setOpen} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FilterButton;
