import TrainingCard from "./TrainingCard";
import { TrainingType } from "@/types";

const TrainingList = ({ trainings }: { trainings: [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {trainings.map((training: TrainingType) => (
        <TrainingCard training={training} key={training.title} />
      ))}
    </div>
  );
};

export default TrainingList;
