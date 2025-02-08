"use client"

import { IExtendedIngredient } from "@/utils/interfaces";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Ingredient({ ingredient }: { ingredient: IExtendedIngredient }) {
    let imageName = `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`;

    if (!ingredient.image.includes('.') || ingredient.image === 'img.spoonacular.' || ingredient.image === null) {
        imageName = '/question-mark.jpg';
    }

    return (
        <motion.li
            key={ingredient.id}
            className="bg-white rounded-lg shadow-sm p-3 hover:shadow transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
            }}
        >
            <div className="flex flex-col items-center">
                <motion.div 
                    className="relative w-16 h-16 mb-2"
                    whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                    transition={{ duration: 0.5 }}
                >
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
                </motion.div>
                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <span className="block font-medium text-sm">{ingredient.name}</span>
                    <span className="text-gray-600 text-xs">{ingredient.amount} {ingredient.unit}</span>
                </motion.div>
            </div>
        </motion.li>
    )
}