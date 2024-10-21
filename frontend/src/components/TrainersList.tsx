import { useAllTrainers } from "@/react-query/trainer";
import Loader from "./Loader";
import { TrainerType } from "@/types";
import TrainerCard from "./TrainerCard";
import { SearchX } from "lucide-react";

const TrainersList = ({ isAdmin = false }) => {
  const { allTrainers, loadingTrainers } = useAllTrainers();

  return (
    <>
      {loadingTrainers ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          {allTrainers.data.length === 0 ? (
            <div className="w-full flex items-center justify-center gap-4 h-[20vh] text-3xl font-[700] text-red-500">
              <SearchX className="w-10 h-10" />
              No Trainer Found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {allTrainers.data.map((trainer: TrainerType) => (
                <div className="w-full" key={trainer._id}>
                  <TrainerCard trainer={trainer} isAdmin={isAdmin} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TrainersList;
