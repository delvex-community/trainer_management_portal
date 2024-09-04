import Loader from "@/components/Loader";
import { useRating } from "@/react-query/trainer";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NonTechRating = () => {
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

  if (isLoading) return <Loader />;

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="flex flex-col bg-white rounded-md p-6 shadow-md gap-3 max-w-md w-full">
        <h2 className="h2-bold text-center mb-6">Non Tech Rating</h2>
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
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonTechRating;
