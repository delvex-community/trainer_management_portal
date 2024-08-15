import { useAllTrainers } from "@/react-query/trainer";
import Loader from "./Loader";
import { TrainerType } from "@/types";
import TrainerCard from "./TrainerCard";

const TrainersList = () => {
  const { allTrainers, loadingTrainers } = useAllTrainers();

  return (
    <>
      {loadingTrainers ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allTrainers.map((trainer: TrainerType) => (
            <div className="flex items-center justify-center" key={trainer._id}>
              <TrainerCard trainer={trainer} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TrainersList;
