import FoodCard from "../FoodCard";
import { getRandomRecipes } from "@/utils/api";

export default async function RandomRecipes() {
  const recipes = await getRandomRecipes(8);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recipes.map((recipe) => (
            <FoodCard
              key={recipe.id}
              {...recipe}
            />
          ))}
        </div>
      </div>
    </div>
  );
}