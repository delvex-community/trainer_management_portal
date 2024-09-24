import TechnologyCard from "./TechnologyCard";

const TechnologyList = ({ data }: { data: any }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
      {data?.map((tech: any) => (
        <TechnologyCard tech={tech} key={tech} />
      ))}
    </div>
  );
};

export default TechnologyList;
