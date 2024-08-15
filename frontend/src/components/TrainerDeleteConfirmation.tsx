import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Delete } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useParams } from "react-router-dom";
import { toast } from "./ui/use-toast";

const TrainerDeleteConfirmation = () => {
  const { trainerId } = useParams();
  const { mutate: deleteTrainer, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(
        `${BACKEND_URL}/trainer/delete/${trainerId}`
      );
      return data;
    },
    onSuccess: () => {
      return toast({
        title: "Deleted Successfully",
        description: "Trainer has been removed.",
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description:
          "Something went wrong while deleting, please try again later.",
        variant: "destructive",
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant="destructive"
          className="text-md flex items-center gap-2"
        >
          <Delete /> Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will permanently delete this trainer
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() => deleteTrainer()}
            className="bg-red-500"
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TrainerDeleteConfirmation;
