'use client';

import { useState, useTransition } from 'react';
import IngredientsFilter from '@/components/filters/IngredientsFilter';
import NutrientsFilter from '@/components/filters/NutrientsFilter';
import CuisinesFilter from '@/components/filters/CuisinesFilter';

interface ClientFiltersProps {
  fetchFilteredRecipes: (formData: FormData) => Promise<any>;
}

export default function ClientFilters({ fetchFilteredRecipes }: ClientFiltersProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [nutrients, setNutrients] = useState<{[key: string]: number}>({});
  const [isPending, startTransition] = useTransition();

  const handleIngredientsChange = (ingredients: string[]) => {
    setSelectedIngredients(ingredients);
    triggerSearch(ingredients, selectedCuisines, nutrients);
  };

  const handleNutrientsChange = (newNutrients: {[key: string]: number}) => {
    setNutrients(newNutrients);
    triggerSearch(selectedIngredients, selectedCuisines, newNutrients);
  };

  const handleCuisinesChange = (cuisines: string[]) => {
    setSelectedCuisines(cuisines);
    triggerSearch(selectedIngredients, cuisines, nutrients);
  };

  const triggerSearch = (
    ingredients: string[],
    cuisines: string[],
    nutrientsData: {[key: string]: number}
  ) => {
    if (ingredients.length || cuisines.length || Object.keys(nutrientsData).length) {
      startTransition(() => {
        const formData = new FormData();
        formData.append('ingredients', ingredients.join(','));
        formData.append('cuisines', cuisines.join(','));
        formData.append('nutrients', JSON.stringify(nutrientsData));
        fetchFilteredRecipes(formData);
      });
    }
  };

  return (
    <div className="w-full md:w-1/4 space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
        <IngredientsFilter onIngredientsChange={handleIngredientsChange} />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Nutrients</h2>
        <NutrientsFilter onNutrientsChange={handleNutrientsChange} />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Cuisines</h2>
        <CuisinesFilter onCuisinesChange={handleCuisinesChange} />
      </div>

      {isPending && (
        <div className="text-center text-sm text-gray-500">
          Updating results...
        </div>
      )}
    </div>
  );
} 