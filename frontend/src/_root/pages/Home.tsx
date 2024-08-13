import SearchInput from "@/components/SearchInput";

const Home = () => {
  return (
    <div className="flex items-center justify-center mt-20">
      <div className="flex flex-col gap-6 w-[400px]">
        <h1 className="text-4xl font-bold text-gray-900 text-center">
          Search Trainers
        </h1>
        <SearchInput />
      </div>
    </div>
  );
};

export default Home;
