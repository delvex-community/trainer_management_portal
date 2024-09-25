import { useAllTrainers } from "@/react-query/trainer";
import Loader from "./Loader";
import { TrainerType } from "@/types";
import TrainerCard from "./TrainerCard";

const TrainersList = ({ isAdmin = false }) => {
  const { allTrainers, loadingTrainers } = useAllTrainers();

  return (
    <>
      {loadingTrainers ? (
        <div>
          <Loader />
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
  );
};

export default TrainersList;
