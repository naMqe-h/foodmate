import { searchRecipes } from "@/utils/api";
import FoodCard from "@/components/FoodCard";
import SearchBar from "@/components/home/SearchBar";
import Link from "next/link";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const results = await searchRecipes(q || "");

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <Link 
          href="/"
          className="inline-flex items-center text-orange-500 hover:text-orange-700"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Link>

        <div className="w-1/2">
          <SearchBar />
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6">
        Search results for: {q}
      </h1>
      
      {results.length === 0 ? (
        <p className="text-gray-600">No recipes found for your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((recipe) => (
            <FoodCard
              key={recipe.id}
              {...recipe}
            />
          ))}
        </div>
      )}
    </main>
  );
}
