import TrainersList from "@/components/TrainersList";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const AdminTrainers = () => {
  return (
    <div className="flex flex-col gap-6 py-8">
      <div className="flex justify-end mb-5">
        <Button className="font-semibold text-lg" asChild>
          <NavLink to="/admin/trainers/add">Add Trainer</NavLink>
        </Button>
      </div>
      <TrainersList isAdmin={true} />
    </div>
  );
};

export default AdminTrainers;
