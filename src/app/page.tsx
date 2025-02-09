import RandomRecipes from "@/components/home/RandomRecipes";
import SearchBar from "@/components/home/SearchBar";

export default function Home() {
  return (
    <div className="h-screen">
      <SearchBar />
      <RandomRecipes />
    </div>
  );
}