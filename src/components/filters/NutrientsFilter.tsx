'use client';

import { useState } from 'react';

interface NutrientsFilterProps {
  onNutrientsChange: (nutrients: { [key: string]: number }) => void;
}

const nutrientRanges = {
  calories: { min: 0, max: 1000, step: 50 },
  protein: { min: 0, max: 100, step: 5 },
  carbs: { min: 0, max: 100, step: 5 },
  fat: { min: 0, max: 100, step: 5 },
};

export default function NutrientsFilter({ onNutrientsChange }: NutrientsFilterProps) {
  const [nutrients, setNutrients] = useState<{ [key: string]: number }>({
    calories: 500,
    protein: 30,
    carbs: 50,
    fat: 20,
  });

  const handleNutrientChange = (nutrient: string, value: number) => {
    const newNutrients = { ...nutrients, [nutrient]: value };
    setNutrients(newNutrients);
    onNutrientsChange(newNutrients);
  };

  return (
    <div className="space-y-4">
      {Object.entries(nutrientRanges).map(([nutrient, range]) => (
        <div key={nutrient} className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium capitalize">
              {nutrient}: {nutrients[nutrient]}
              {nutrient === 'calories' ? ' kcal' : 'g'}
            </label>
          </div>
          <input
            type="range"
            min={range.min}
            max={range.max}
            step={range.step}
            value={nutrients[nutrient]}
            onChange={(e) => handleNutrientChange(nutrient, Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{range.min}</span>
            <span>{range.max}</span>
          </div>
        </div>
      ))}
    </div>
  );
} 