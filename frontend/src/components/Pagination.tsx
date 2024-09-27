import { useParams, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { useQueryClient } from "@tanstack/react-query";

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
    <div className="flex gap-2">
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        onClick={() => onClick("prev")}
        disabled={Number(page) === 1}
      >
        Previous
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        onClick={() => onClick("next")}
        disabled={Number(page) >= totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
