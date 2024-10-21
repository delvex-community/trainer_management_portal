import TechnologyCard from "./TechnologyCard";

const TechnologyList = ({ data }: { data: any }) => {
  return (
    <div className="flex items-center gap-3 flex-wrap justify-center w-full max-h-[60vh] sm:max-h-[80vh] overflow-auto py-2">
      {data?.map((tech: any) => (
        <TechnologyCard tech={tech} key={tech.name} />
      ))}
    </div>
  );
};

export default TechnologyList;
