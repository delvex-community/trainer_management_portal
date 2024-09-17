import { useSearchParams } from "react-router-dom";
import RatingFilter from "./RatingFilter";
import Sort from "./Sort";
import { Button } from "./ui/button";
import { useQueryClient } from "@tanstack/react-query";
import TechnologyFilter from "./TechnologyFilter";
import TechRatingFilter from "./TechRatingFIlter";
import NonTechRatingFilter from "./NonTechRatingFilter";

const Filter = ({ setOpen }: { setOpen: any }) => {
  const [_, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  function resetParams() {
    setSearchParams({});
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["all-trainers"] });
    }, 100);
    setOpen(false);
  }

  return (
    <div className="mt-4 flex flex-col items-center gap-6 max-h-[700px] overflow-auto">
      <div className="flex flex-col items-center gap-5 sm:flex-row">
        <div className="flex flex-col gap-3 items-center">
          <h3 className="text-gray-800 font-semibold bg-gray-200 py-1 px-2 rounded-md">
            Sort
          </h3>
          <Sort />
        </div>

        <div className="flex  flex-col gap-3 items-center ">
          <h3 className="text-gray-800 font-semibold bg-gray-200 py-1 px-2 rounded-md">
            Technologies
          </h3>
          <TechnologyFilter />
        </div>
      </div>
      <div className="flex flex-col items-center gap-5 sm:flex-row">
        <div className="flex flex-col gap-3 items-center ">
          <h3 className="text-gray-800 font-semibold bg-gray-200 py-1 px-2 rounded-md">
            Tech Rating
          </h3>
          <TechRatingFilter />
        </div>

        <div className="flex flex-col gap-3 items-center ">
          <h3 className="text-gray-800 font-semibold bg-gray-200 py-1 px-2 rounded-md">
            Non Tech Rating
          </h3>
          <NonTechRatingFilter />
        </div>
      </div>

      <div className="flex flex-col gap-3 items-center ">
        <h3 className="text-gray-800 font-semibold bg-gray-200 py-1 px-2 rounded-md">
          Overall Rating
        </h3>
        <RatingFilter />
      </div>

      <Button onClick={resetParams}>Reset</Button>
    </div>
  );
};

export default Filter;
