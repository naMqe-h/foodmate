"use client"

import { IExtendedIngredient } from "@/utils/interfaces";
import Image from "next/image";

export default function Ingredient({ ingredient }: { ingredient: IExtendedIngredient }) {
    let imageName = `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`;

    if (!ingredient.image.includes('.') || ingredient.image === 'img.spoonacular.' || ingredient.image === null) {
        imageName = '/question-mark.jpg';
    }

    return (
        <li key={ingredient.id} className="bg-white rounded-lg shadow-sm p-3 hover:shadow transition-shadow">
            <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 mb-2">
                    <Image
                        src={`${imageName}`}
                        alt={ingredient.name}
                        fill
                        className="object-contain rounded-lg"
                        onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.src.endsWith('/question-mark.jpg')) {
                                target.src = "/question-mark.jpg";
                            }
                        }}
                    />
                </div>
                <div className="text-center">
                    <span className="block font-medium text-sm">{ingredient.name}</span>
                    <span className="text-gray-600 text-xs">{ingredient.amount} {ingredient.unit}</span>
                </div>
            </div>
        </li>
    )
}