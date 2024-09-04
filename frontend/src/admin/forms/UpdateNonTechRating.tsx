import { useNavigate, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useRating } from "@/react-query/trainer";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { toast } from "@/components/ui/use-toast";

const UpdateNonTechRating = () => {
  const navigate = useNavigate();
  const { trainerId } = useParams();
  const { rating, isLoading } = useRating(trainerId || "");

  const [rating1, setRating1] = useState(rating?.nonTech.rating1);
  const [rating2, setRating2] = useState(rating?.nonTech.rating2);
  const [rating3, setRating3] = useState(rating?.nonTech.rating3);
  const [rating4, setRating4] = useState(rating?.nonTech.rating4);
  const [rating5, setRating5] = useState(rating?.nonTech.rating5);

  useEffect(() => {
    setRating1(rating?.nonTech.rating1);
    setRating2(rating?.nonTech.rating2);
    setRating3(rating?.nonTech.rating3);
    setRating4(rating?.nonTech.rating4);
    setRating5(rating?.nonTech.rating5);
  }, [rating]);

  const { mutate: updateRating, isPending } = useMutation({
    mutationFn: async () => {
      const payload = {
        rating1,
        rating2,
        rating3,
        rating4,
        rating5,
      };
      const { data } = await axios.patch(
        `${BACKEND_URL}/trainer/update-rating/nontech/${trainerId}`,
        payload
      );

      return data;
    },
    onSuccess: () => {
      navigate(`/admin/trainers/${trainerId}`);
      return toast({
        title: "Updated Successfully",
        description: "Trainer's rating has been updated.",
      });
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        return toast({
          title: "Something went wrong",
          description: err.message,
          variant: "destructive",
        });
      }
      return toast({
        title: "Something went wrong",
        // description: "err.message",
        variant: "destructive",
      });
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="flex flex-col bg-white rounded-md p-6 shadow-md gap-3 max-w-md w-full">
        <h2 className="h2-bold text-center mb-6">Update Non Tech Rating</h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 justify-between flex-col sm:flex-row text-center sm:text-left">
            <span className="text-lg font-semibold">Knowledge of Subject</span>
            <div className="flex items-center gap-2">
              {Array(5)
                .fill(undefined)
                .map((_, index) => {
                  return (
                    <Star
                      key={index}
                      className={`cursor-pointer text-yellow-500 ${
                        rating1 >= index + 1 && "fill-yellow-500"
                      }`}
                      onClick={() => setRating1(index + 1)}
                    />
                  );
                })}
            </div>
          </div>
          <div className="flex items-center gap-2 justify-between flex-col sm:flex-row text-center sm:text-left">
            <span className="text-lg font-semibold">Communication Skills</span>
            <div className="flex items-center gap-2">
              {Array(5)
                .fill(undefined)
                .map((_, index) => {
                  return (
                    <Star
                      key={index}
                      className={`cursor-pointer text-yellow-500 ${
                        rating2 >= index + 1 && "fill-yellow-500"
                      }`}
                      onClick={() => setRating2(index + 1)}
                    />
                  );
                })}
            </div>
          </div>
          <div className="flex items-center gap-2 justify-between flex-col sm:flex-row text-center sm:text-left">
            <span className="text-lg font-semibold">
              Engagement with Participants
            </span>
            <div className="flex items-center gap-2">
              {Array(5)
                .fill(undefined)
                .map((_, index) => {
                  return (
                    <Star
                      key={index}
                      className={`cursor-pointer text-yellow-500 ${
                        rating3 >= index + 1 && "fill-yellow-500"
                      }`}
                      onClick={() => setRating3(index + 1)}
                    />
                  );
                })}
            </div>
          </div>
          <div className="flex items-center gap-2 justify-between flex-col sm:flex-row text-center sm:text-left">
            <span className="text-lg font-semibold">Presentation Style</span>
            <div className="flex items-center gap-2">
              {Array(5)
                .fill(undefined)
                .map((_, index) => {
                  return (
                    <Star
                      key={index}
                      className={`cursor-pointer text-yellow-500 ${
                        rating4 >= index + 1 && "fill-yellow-500"
                      }`}
                      onClick={() => setRating4(index + 1)}
                    />
                  );
                })}
            </div>
          </div>
          <div className="flex items-center gap-2 justify-between flex-col sm:flex-row text-center sm:text-left">
            <span className="text-lg font-semibold">Practical Application</span>
            <div className="flex items-center gap-2">
              {Array(5)
                .fill(undefined)
                .map((_, index) => {
                  return (
                    <Star
                      key={index}
                      className={`cursor-pointer text-yellow-500 ${
                        rating5 >= index + 1 && "fill-yellow-500"
                      }`}
                      onClick={() => setRating5(index + 1)}
                    />
                  );
                })}
            </div>
          </div>
        </div>
        <Button className="mt-3" onClick={() => updateRating()}>
          {isPending ? <Loader /> : "Update Rating"}
        </Button>
      </div>
    </div>
  );
};

export default UpdateNonTechRating;
