import RandomRecipes from "@/components/home/RandomRecipes";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="h-screen">
      <Navbar />

      <div className="my-20">
        <RandomRecipes />
      </div>
    </div>
  );
}
