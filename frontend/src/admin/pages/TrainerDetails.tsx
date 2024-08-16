import { Link, useParams } from "react-router-dom";
import { useTrainerById } from "@/react-query/trainer";
import { Edit, Loader, Mail, Phone, Star } from "lucide-react";
import { useAdminContext } from "@/context/AdminContext";
import { useCurrentAdmin } from "@/react-query/admin";

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold sm:body-bold text-primary-500">{value}</p>
    <p className="small-medium sm:base-medium text-primary-500">{label}</p>
  </div>
);

const TrainerDetails = () => {
  const { trainerId } = useParams();
  const { trainer, isLoading } = useTrainerById(trainerId || "");
  const { admin } = useCurrentAdmin();

  console.log(admin);

  if (isLoading)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="flex items-center justify-center sm:py-10">
      <div className="profile-inner_container">
        <div className="flex md:flex-row flex-col items-center md:items-start flex-1 gap-7">
          <img
            src={trainer?.avatar || "/icons/profile-placeholder.svg"}
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full object-cover"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <div className="flex flex-col gap-2 items-center md:flex-row md:gap-6">
                <h1 className="text-center md:text-left h3-bold sm:h1-semibold">
                  {trainer?.name}
                </h1>
                <span className="text-yellow-500 text-lg font-bold flex items-center gap-2">
                  {trainer.avgRating}
                  <Star className="fill-yellow-500" />
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start md:items-start gap-3 mt-3 ">
                <p className="flex items-center gap-2 small-regular sm:body-medium text-light-3 text-center xl:text-left">
                  <Mail className="h-5 w-5" />
                  {trainer?.email}
                </p>
                <p className="flex items-center gap-2 small-regular sm:body-medium text-light-3 text-center xl:text-left">
                  <Phone className="h-5 w-5" />
                  {trainer?.contact}
                </p>
              </div>
            </div>

            <div className="flex gap-6 mt-6 items-center justify-center md:justify-start flex-wrap z-20">
              <StatBlock value={15} label="Training Delivered" />
              <StatBlock value={10} label="Online Classes" />
            </div>

            <p className="flex items-center justify-center sm:justify-start flex-wrap gap-2 small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {trainer?.tech.split(",").map((tech: string) => (
                <span
                  key={tech}
                  className="bg-gray-800 text-white px-2 py-1 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </p>
          </div>

          {admin && (
            <div className="flex flex-col justify-center gap-4">
              <Link
                to={`/admin/trainers/${trainer?._id}/update-profile`}
                className={`h-10 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg`}
              >
                <Edit className="w-4 h-4" />
                <p className="flex whitespace-nowrap text-sm sm:text-base">
                  Edit Profile
                </p>
              </Link>
              <Link
                to={`/admin/trainers/${trainer?._id}/update-rating`}
                className={`h-10 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg`}
              >
                <Star className="w-4 h-4" />
                <p className="flex whitespace-nowrap text-sm sm:text-base">
                  Update Ratings
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
