import { BACKEND_URL } from "@/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Trash2 } from "lucide-react";
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
import { toast } from "./ui/use-toast";

const UserDeleteConfirmation = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();

  const { mutate: deleteTrainer, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(
        `${BACKEND_URL}/user/delete/${userId}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
      return toast({
        title: "Deleted Successfully",
        description: "User has been removed.",
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
      <AlertDialogTrigger asChild>
        <Trash2 className="w-5 h-5 text-red-500 hover:scale-[1.20] duration-150" />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will permanently delete this user
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

export default UserDeleteConfirmation;
