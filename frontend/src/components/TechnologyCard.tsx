import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BACKEND_URL } from "@/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { EllipsisVertical, Loader } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

const TechnologyCard = ({ tech }: { tech: { name: string; _id: string } }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [input, setInput] = useState(tech?.name || "");
  const queryClient = useQueryClient();

  const { mutate: updateTech, isPending: isUpdating } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.patch(
        `${BACKEND_URL}/technology/${tech?._id}`,
        { name: input }
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-technologies"] });
      setOpenEdit(false);
      return toast({ description: "Technology updated successfully" });
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

  const { mutate: deleteTech, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(
        `${BACKEND_URL}/technology/${tech?._id}`
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-technologies"] });
      setOpenDelete(false);
      return toast({ description: "Technology deleted successfully" });
    },
    onError: () => {
      return toast({
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    },
  });

  function onUpdate() {
    console.log(input);

    if (!input) return;
    updateTech();
  }

  return (
    <>
      <div className="flex items-center justify-between shadow-md rounded-md p-4 w-full">
        <h3 className="text-xl font-semibold text-center">{tech.name}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical className="w-4 h-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="text-sm font-semibold cursor-pointer"
              onClick={() => setOpenEdit(true)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-sm font-semibold cursor-pointer"
              onClick={() => setOpenDelete(true)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Technology</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col  gap-4">
            <Input
              placeholder="Enter technology name"
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={onUpdate} disabled={isUpdating}>
              {isUpdating ? <Loader /> : "Update"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className="max-w-[350px]">
          <DialogHeader>
            <DialogTitle>Delete {tech?.name}</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete?
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => deleteTech()}
            disabled={isDeleting}
            variant="destructive"
          >
            {isDeleting ? <Loader /> : "Delete"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TechnologyCard;
