import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import TechnologyList from "@/components/TechnologyList";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/config";
import { useAllTechnologies } from "@/react-query/technology";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CirclePlus, Loader } from "lucide-react";
import { useState } from "react";

const AdminTechnologies = () => {
  const { allTechnologies, isLoading } = useAllTechnologies();
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: addTech, isPending } = useMutation({
    mutationFn: async (payload: { name: string }) => {
      const { data } = await axios.post(
        `${BACKEND_URL}/technology/add`,
        payload,
        {
          withCredentials: true,
        }
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-technologies"] });
      setOpen(false);
      return toast({ description: "Technology added successfully" });
    },
    onError: () => {
      return toast({
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setInput("");
    },
  });

  if (isLoading)
    return (
      <div className="h-[70vh] w-full flex items-center justify-center">
        <Loader className="animate-spin h-8 w-8" />
      </div>
    );

  function onAddTech() {
    if (!input) return;
    addTech({ name: input });
  }

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="w-full max-w-[400px]">
        <SearchInput />
      </div>
      <div className="flex justify-center mb-5">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 font-semibold text-lg px-4 py-2 rounded-md border-[1px] hover:border-gray-100 hover:bg-gray-100">
              <CirclePlus className="w-5 h-5 text-blue-500" />
              Add Technology
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-[400px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">Add a technology</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col  gap-4">
              <Input
                placeholder="Enter technology name"
                className="focus-visible:ring-0 focus-visible:ring-offset-0"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button onClick={onAddTech} disabled={isPending}>
                {isPending ? <Loader /> : "Add"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <TechnologyList data={allTechnologies?.data} />

      <div className="flex items-center justify-center mt-4">
        <Pagination totalPages={allTechnologies?.totalPages} />
      </div>
    </div>
  );
};

export default AdminTechnologies;
