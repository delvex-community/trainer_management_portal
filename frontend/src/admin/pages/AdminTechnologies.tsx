import { useAllTechnologies } from "@/react-query/technology";

const AdminTechnologies = () => {
  const { allTechnologies, isLoading } = useAllTechnologies();

  console.log(allTechnologies);

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="w-full max-w-[400px]">
        <SearchInput />
      </div>
      <div className="flex justify-center mb-5">
        <Button className="font-semibold text-lg" asChild>
          <NavLink to="/admin/trainers/add">Add Trainer</NavLink>
        </Button>
      </div>
      <TrainersList isAdmin={true} />
      <div className="flex items-center justify-center mt-4">
        <Pagination totalPages={allTrainers?.totalPages} />
      </div>
    </div>
  );
};

export default AdminTechnologies;
