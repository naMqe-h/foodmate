import { Suspense } from 'react';
import { IRecipe } from '@/utils/interfaces';
import FoodCard from '@/components/FoodCard';
import { getRandomRecipes, searchRecipesWithFilters } from '@/utils/api';
import { revalidatePath } from 'next/cache';
import ClientFilters from './ClientFilters';


// Server Action for fetching filtered recipes
async function fetchFilteredRecipes(formData: FormData) {
  'use server';
  
  const ingredients = formData.get('ingredients')?.toString().split(',').filter(Boolean) || [];
  const cuisines = formData.get('cuisines')?.toString().split(',').filter(Boolean) || [];
  const nutrientsData = formData.get('nutrients')?.toString();
  const nutrients = nutrientsData ? JSON.parse(nutrientsData) : {};

  const recipes = await searchRecipesWithFilters({
    ingredients,
    cuisines,
    nutrients
  });

  revalidatePath('/recipes');
  return recipes;
}

// Recipe List Component
function RecipeList({ recipes }: { recipes: IRecipe[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <FoodCard {...recipe} key={recipe.id} />
      ))}
    </div>
  );
}

// Server Component
export default async function RecipesPage() {
  // Initial server-side data fetch
  const initialRecipes = await getRandomRecipes(20);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Advanced Search</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <ClientFilters fetchFilteredRecipes={fetchFilteredRecipes} />
        
        <div className="w-full md:w-3/4">
          <Suspense fallback={
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          }>
            <RecipeList recipes={initialRecipes} />
          </Suspense>
        </div>
      </div>
    </div>
  );
} 