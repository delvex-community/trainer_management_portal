import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";

type PaginationProps = {
  totalPages: number;
};

const Pagination = ({ totalPages }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const queryClient = useQueryClient();
  const { trainerId } = useParams();

  const onClick = (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;

    searchParams.set("page", String(pageValue));
    setSearchParams(searchParams);
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
      queryClient.invalidateQueries({ queryKey: ["all-technologies"] });
      queryClient.invalidateQueries({ queryKey: ["all-trainers"] });
      queryClient.invalidateQueries({ queryKey: ["all-trainings"] });
      queryClient.invalidateQueries({
        queryKey: ["trainer-trainings", trainerId],
      });
    }, 100);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-3">
      <button
        className="w-fit border-[1px] border-gray-300 rounded-md p-2 cursor-pointer hover:bg-gray-100 disabled:hover:bg-transparent disabled:cursor-not-allowed"
        onClick={() => onClick("prev")}
        disabled={Number(page) === 1}
      >
        <ChevronLeft />
      </button>
      <span className="font-semibold">
        Page {page} out of {totalPages}
      </span>
      <button
        className="w-fit border-[1px] border-gray-300 rounded-md p-2 cursor-pointer hover:bg-gray-100 disabled:hover:bg-transparent disabled:cursor-not-allowed"
        onClick={() => onClick("next")}
        disabled={Number(page) >= totalPages}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
