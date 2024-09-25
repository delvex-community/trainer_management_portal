import TechnologyCard from "./TechnologyCard";

const TechnologyList = ({ data }: { data: any }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-h-[80vh] overflow-auto py-2">
      {data?.map((tech: any) => (
        <TechnologyCard tech={tech} key={tech.name} />
      ))}
    </div>
  );
};

export default TechnologyList;
