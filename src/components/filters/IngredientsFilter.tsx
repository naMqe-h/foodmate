'use client';

import { useState } from 'react';

interface IngredientsFilterProps {
  onIngredientsChange: (ingredients: string[]) => void;
}

const commonIngredients = [
  'chicken', 'beef', 'pork', 'fish',
  'rice', 'pasta', 'potato',
  'tomato', 'onion', 'garlic',
  'carrot', 'broccoli', 'spinach',
  'cheese', 'milk', 'eggs'
];

export default function IngredientsFilter({ onIngredientsChange }: IngredientsFilterProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleIngredientToggle = (ingredient: string) => {
    const newSelection = selectedIngredients.includes(ingredient)
      ? selectedIngredients.filter(i => i !== ingredient)
      : [...selectedIngredients, ingredient];
    
    setSelectedIngredients(newSelection);
    onIngredientsChange(newSelection);
  };

  const filteredIngredients = commonIngredients.filter(ingredient =>
    ingredient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search ingredients..."
        className="w-full p-2 border rounded-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        {filteredIngredients.map((ingredient) => (
          <button
            key={ingredient}
            onClick={() => handleIngredientToggle(ingredient)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedIngredients.includes(ingredient)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {ingredient}
          </button>
        ))}
      </div>
    </div>
  );
} 