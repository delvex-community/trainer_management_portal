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
import { Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { toast } from "./ui/use-toast";

const TrainingDeleteConfirmation = ({ trainingId }: { trainingId: string }) => {
  const queryClient = useQueryClient();

  const { mutate: deleteTraining, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(
        `${BACKEND_URL}/training/delete/${trainingId}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-trainings"] });
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
        <Trash2 className="text-red-600 w-5 h-5 hover:scale-[1.20] duration-150" />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will permanently delete this training
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() => deleteTraining()}
            className="bg-red-500"
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TrainingDeleteConfirmation;
