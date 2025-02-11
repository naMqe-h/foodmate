'use client';

import { useState } from 'react';

interface CuisinesFilterProps {
  onCuisinesChange: (cuisines: string[]) => void;
}

const availableCuisines = [
  'Italian', 'Mexican', 'Chinese', 'Japanese',
  'Indian', 'Thai', 'Mediterranean', 'French',
  'Greek', 'Spanish', 'Korean', 'Vietnamese',
  'American', 'Middle Eastern', 'Caribbean'
];

export default function CuisinesFilter({ onCuisinesChange }: CuisinesFilterProps) {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  const handleCuisineToggle = (cuisine: string) => {
    const newSelection = selectedCuisines.includes(cuisine)
      ? selectedCuisines.filter(c => c !== cuisine)
      : [...selectedCuisines, cuisine];
    
    setSelectedCuisines(newSelection);
    onCuisinesChange(newSelection);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {availableCuisines.map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => handleCuisineToggle(cuisine)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedCuisines.includes(cuisine)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cuisine}
          </button>
        ))}
      </div>
    </div>
  );
} 