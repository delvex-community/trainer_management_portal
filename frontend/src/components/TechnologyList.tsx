import TechnologyCard from "./TechnologyCard";

const TechnologyList = ({ data }: { data: any }) => {
  return (
    <div className="grid grid-cols-4 gap-6 w-full">
      {data?.map((tech: any) => (
        <TechnologyCard tech={tech} key={tech} />
      ))}
    </div>
  );
};

export default TechnologyList;
