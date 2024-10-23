import Pagination from "@/components/Pagination";
import TrainingList from "@/components/TrainingList";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTrainerById } from "@/react-query/trainer";
import { useTrainerTrainings } from "@/react-query/training";
import {
  CircleCheckBig,
  Loader,
  Mail,
  MapPinCheckInside,
  Phone,
  SearchX,
  Star,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const TrainerDetails = () => {
  const { trainerId } = useParams();
  const { trainer, isLoading } = useTrainerById(trainerId || "");
  const { trainerTrainings, isLoading: loadingTrainings } = useTrainerTrainings(
    trainerId || ""
  );

  if (isLoading || loadingTrainings)
    return (
      <div className="h-[70vh] w-full flex items-center justify-center">
        <Loader className="animate-spin h-8 w-8" />
      </div>
    );

  return (
    <div className="flex items-center justify-center sm:py-4">
      <div className="profile-inner_container">
        <div className="flex flex-col gap-10 w-full">
          <div className="bg-gradient-to-br sm:from-gray-50 sm:to-gray-100/90 sm:border-[1px] sm:border-gray-300 py-8 px-12 rounded-lg flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-7">
              <img
                src={trainer?.avatar || "/images/user-profile.png"}
                alt="profile"
                className="w-28 h-28 lg:h-34 lg:w-34 rounded-xl object-cover"
              />
              <div className="flex flex-col flex-1 justify-between md:mt-2">
                <div className="flex flex-col w-full">
                  <div className="flex flex-col gap-2 items-center md:flex-row md:gap-6">
                    <h1 className="text-center md:text-left text-3xl font-[600]">
                      {trainer?.name}
                    </h1>
                    <span className="text-yellow-400 text-lg font-bold flex items-center gap-2">
                      {trainer?.avgRating}
                      <Star className="fill-yellow-400 h-4 w-4" />
                    </span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start md:items-start gap-3 mt-3 ">
                    <span className="flex items-center gap-2 font-[500] text-blue-600 bg-blue-100 px-2 py-1 rounded-md text-center xl:text-left">
                      <Mail className="h-4 w-4" />
                      {trainer?.email}
                    </span>
                    <span className="flex items-center gap-2 font-[500] text-blue-600 bg-blue-100 px-2 py-1 rounded-md text-center xl:text-left">
                      <Phone className="h-4 w-4" />
                      {trainer?.contact}
                    </span>
                  </div>
                </div>

                <div className="mt-4 font-[500] flex items-center gap-2 justify-center md:justify-start">
                  <span className="flex items-center gap-2 rounded-md text-blue-600 bg-blue-100 px-2 py-1">
                    <MapPinCheckInside className="h-4 w-4" />
                    {trainer.location}
                  </span>
                </div>

                <div className="flex gap-2 italic mt-6 items-center justify-center md:justify-start flex-wrap z-20">
                  <CircleCheckBig /> {trainer.tech.length} Trainings Delivered
                </div>

                <p className="flex items-center justify-center sm:justify-start flex-wrap gap-2 small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
                  {trainer?.tech.map((tech: string) => (
                    <span
                      key={tech}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`h-10 bg-zinc-800 hover:bg-zinc-700 px-5 text-yellow-400 flex-center gap-2 rounded-lg`}
              >
                <Star className="fill-yellow-400 w-4 h-4" />
                <p className="flex font-semibold">Ratings</p>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="font-[500] text-md">
                  <Link to={`/trainers/${trainer?._id}/rating/tech`}>
                    Tech Rating
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="font-[500] text-md">
                  <Link to={`/trainers/${trainer?._id}/rating/nontech`}>
                    Non Tech Rating
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {trainerTrainings.data.length !== 0 ? (
            <TrainingList trainings={trainerTrainings.data} />
          ) : (
            <div className="bg-gradient-to-br sm:from-gray-50 sm:to-gray-100/90 sm:border-[1px] sm:border-gray-300 flex flex-col items-center sm:flex-row gap-4 justify-center rounded-md text-3xl font-[700] h-36 text-red-500 text-center mb-4">
              <SearchX className="w-10 h-10" />
              No Training Delivered Yet
            </div>
          )}

          {trainerTrainings.totalPages !== 0 && (
            <div className="flex justify-center">
              <Pagination totalPages={trainerTrainings.totalPages} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
