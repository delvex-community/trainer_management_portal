import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/config";
import { useRatingLabels } from "@/react-query/rating";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Edit, Loader } from "lucide-react";
import { useState } from "react";

const AdminRatings = () => {
  const { ratingLabels, isLoading } = useRatingLabels();
  const [input, setInput] = useState("");
  const [openDialogTech, setOpenDialogTech] = useState(false);
  const [openDialogNonTech, setOpenDialogNonTech] = useState(false);
  const [label, setLabel] = useState("");
  const queryClient = useQueryClient();

  const { mutate: updateTechLabel, isPending: updatingTechLabel } = useMutation(
    {
      mutationFn: async (payload) => {
        const { data } = await axios.patch(`${BACKEND_URL}/rating/label/tech`, {
          data: payload,
        });

        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["rating-labels"] });
        setOpenDialogTech(false);
        toast({ description: "Label updated successfully" });
      },
      onError: () => {
        toast({
          title: "Internal Error",
          description: "Something went wrong, please try again later.",
          variant: "destructive",
        });
      },
      onSettled: () => {
        setInput("");
      },
    }
  );

  const { mutate: updateNonTechLabel, isPending: updatingNonTechLabel } =
    useMutation({
      mutationFn: async (payload) => {
        const { data } = await axios.patch(
          `${BACKEND_URL}/rating/label/nontech`,
          {
            data: payload,
          }
        );

        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["rating-labels"] });
        setOpenDialogNonTech(false);
        toast({ description: "Label updated successfully" });
      },
      onError: () => {
        toast({
          title: "Internal Error",
          description: "Something went wrong, please try again later.",
          variant: "destructive",
        });
      },
      onSettled: () => {
        setInput("");
      },
    });

  function onTechUpdate() {
    let data = { ...ratingLabels.data.tech };

    if (label === "label1") {
      data = { ...data, label1: input };
    }
    if (label === "label2") {
      data = { ...data, label2: input };
    }
    if (label === "label3") {
      data = { ...data, label3: input };
    }
    if (label === "label4") {
      data = { ...data, label4: input };
    }
    if (label === "label5") {
      data = { ...data, label5: input };
    }

    updateTechLabel(data);
  }

  function onNonTechUpdate() {
    let data = { ...ratingLabels.data.nonTech };

    if (label === "label1") {
      data = { ...data, label1: input };
    }
    if (label === "label2") {
      data = { ...data, label2: input };
    }
    if (label === "label3") {
      data = { ...data, label3: input };
    }
    if (label === "label4") {
      data = { ...data, label4: input };
    }
    if (label === "label5") {
      data = { ...data, label5: input };
    }

    updateNonTechLabel(data);
  }

  if (isLoading)
    return (
      <div className="h-[70vh] w-full flex items-center justify-center">
        <Loader className="animate-spin h-8 w-8" />
      </div>
    );

  return (
    <div className="flex flex-col gap-10 items-center min-h-[80vh]">
      <h1 className="text-xl md:text-2xl font-bold">Update Rating Labels</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-5 items-center">
          <h2 className="text-xl font-semibold">Tech Ratings</h2>
          <div className="min-w-[300px] sm:min-w-[400px]">
            <div className="flex items-center justify-between gap-4 shadow-md rounded-md p-4 font-semibold">
              <span>{ratingLabels?.data.tech?.label1}</span>
              <Edit
                className="w-4 h-4 cursor-pointer"
                onClick={() => {
                  setOpenDialogTech(true);
                  setLabel("label1");
                  setInput(ratingLabels?.data.tech?.label1);
                }}
              />
            </div>
            <div className="flex items-center justify-between gap-4 shadow-md rounded-md p-4 font-semibold">
              <span>{ratingLabels?.data.tech?.label2}</span>
              <Edit
                className="w-4 h-4 cursor-pointer"
                onClick={() => {
                  setOpenDialogTech(true);
                  setLabel("label2");
                  setInput(ratingLabels?.data.tech?.label2);
                }}
              />
            </div>
            <div className="flex items-center justify-between gap-4 shadow-md rounded-md p-4 font-semibold">
              <span>{ratingLabels?.data.tech?.label3}</span>
              <Edit
                className="w-4 h-4 cursor-pointer"
                onClick={() => {
                  setOpenDialogTech(true);
                  setLabel("label3");
                  setInput(ratingLabels?.data.tech?.label3);
                }}
              />
            </div>
            <div className="flex items-center justify-between gap-4 shadow-md rounded-md p-4 font-semibold">
              <span>{ratingLabels?.data.tech?.label4}</span>
              <Edit
                className="w-4 h-4 cursor-pointer"
                onClick={() => {
                  setOpenDialogTech(true);
                  setLabel("label4");
                  setInput(ratingLabels?.data.tech?.label4);
                }}
              />
            </div>
            <div className="flex items-center justify-between gap-4 shadow-md rounded-md p-4 font-semibold">
              <span>{ratingLabels?.data.tech?.label5}</span>
              <Edit
                className="w-4 h-4 cursor-pointer"
                onClick={() => {
                  setOpenDialogTech(true);
                  setLabel("label5");
                  setInput(ratingLabels?.data.tech?.label5);
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center">
          <h2 className="text-xl font-semibold">Non Tech Ratings</h2>
          <div className="min-w-[300px] sm:min-w-[400px]">
            <div className="flex items-center justify-between gap-4 shadow-md rounded-md p-4 font-semibold">
              <span>{ratingLabels?.data.nonTech?.label1}</span>
              <Edit
                className="w-4 h-4 cursor-pointer"
                onClick={() => {
                  setOpenDialogNonTech(true);
                  setLabel("label1");
                  setInput(ratingLabels?.data.nonTech?.label1);
                }}
              />
            </div>
            <div className="flex items-center justify-between gap-4 shadow-md rounded-md p-4 font-semibold">
              <span>{ratingLabels?.data.nonTech?.label2}</span>
              <Edit
                className="w-4 h-4 cursor-pointer"
                onClick={() => {
                  setOpenDialogNonTech(true);
                  setLabel("label2");
                  setInput(ratingLabels?.data.nonTech?.label2);
                }}
              />
            </div>
            <div className="flex items-center justify-between gap-4 shadow-md rounded-md p-4 font-semibold">
              <span>{ratingLabels?.data.nonTech?.label3}</span>
              <Edit
                className="w-4 h-4 cursor-pointer"
                onClick={() => {
                  setOpenDialogNonTech(true);
                  setLabel("label3");
                  setInput(ratingLabels?.data.nonTech?.label3);
                }}
              />
            </div>
            <div className="flex items-center justify-between gap-4 shadow-md rounded-md p-4 font-semibold">
              <span>{ratingLabels?.data.nonTech?.label4}</span>
              <Edit
                className="w-4 h-4 cursor-pointer"
                onClick={() => {
                  setOpenDialogNonTech(true);
                  setLabel("label4");
                  setInput(ratingLabels?.data.nonTech?.label4);
                }}
              />
            </div>
            <div className="flex items-center justify-between gap-4 shadow-md rounded-md p-4 font-semibold">
              <span>{ratingLabels?.data.nonTech?.label5}</span>
              <Edit
                className="w-4 h-4 cursor-pointer"
                onClick={() => {
                  setOpenDialogNonTech(true);
                  setLabel("label5");
                  setInput(ratingLabels?.data.nonTech?.label5);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Dialog open={openDialogTech} onOpenChange={setOpenDialogTech}>
        <DialogContent className="max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Update Rating Label</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Enter Label"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={onTechUpdate} disabled={updatingTechLabel}>
              {updatingTechLabel ? <Loader /> : "Update"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={openDialogNonTech} onOpenChange={setOpenDialogNonTech}>
        <DialogContent className="max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Update Rating Label</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Enter Label"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={onNonTechUpdate} disabled={updatingNonTechLabel}>
              {updatingNonTechLabel ? <Loader /> : "Update"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRatings;
