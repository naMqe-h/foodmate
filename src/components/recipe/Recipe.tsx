"use client"

import { IRecipe } from "@/utils/interfaces";
import { motion } from "framer-motion";
import Image from "next/image";
import Badges from "./Badges";
import BasicInformations from "./BasicInformations";
import Ingredient from "./Ingredient";
import Instructions from "./Instructions";


export default function Recipe({ recipe }: { recipe: IRecipe }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <motion.div 
            className="container mx-auto px-4 py-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div 
                className="bg-white rounded-lg shadow-lg p-6"
                variants={itemVariants}
            >
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                    variants={itemVariants}
                >
                    <motion.div 
                        className="relative h-[400px] w-full"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image
                            src={recipe.image}
                            alt={recipe.title}
                            fill
                            className="object-cover rounded-lg"
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <motion.h1 
                            className="text-3xl font-bold mb-2"
                            variants={itemVariants}
                        >
                            {recipe.title}
                        </motion.h1>
                        <Badges recipe={recipe} />
                        <BasicInformations recipe={recipe} />
                    </motion.div>
                </motion.div>

                <motion.div 
                    className="mb-8"
                    variants={itemVariants}
                >
                    <motion.h2 
                        className="text-xl font-semibold mb-3"
                        variants={itemVariants}
                    >
                        Summary
                    </motion.h2>
                    <motion.p 
                        dangerouslySetInnerHTML={{ __html: recipe.summary }} 
                        className="text-gray-700"
                        variants={itemVariants}
                    />
                </motion.div>

                <motion.div 
                    className="mb-8"
                    variants={itemVariants}
                >
                    <motion.h2 
                        className="text-xl font-semibold mb-3"
                        variants={itemVariants}
                    >
                        Ingredients
                    </motion.h2>
                    <motion.ul 
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
                        variants={itemVariants}
                    >
                        {recipe.extendedIngredients
                            .filter(ingredient => ingredient.id !== -1)
                            .map((ingredient, index) => (
                                <Ingredient key={`${ingredient.id}-${index}`} ingredient={ingredient} />
                        ))}
                    </motion.ul>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Instructions recipe={recipe} />
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    variants={itemVariants}
                >
                    <motion.div variants={itemVariants}>
                        <motion.h2 
                            className="text-xl font-semibold mb-3"
                            variants={itemVariants}
                        >
                            Categories
                        </motion.h2>
                        <motion.div 
                            className="space-y-2"
                            variants={itemVariants}
                        >
                            {recipe.cuisines.length > 0 && (
                                <motion.p variants={itemVariants}>
                                    Cuisines: {recipe.cuisines.join(', ')}
                                </motion.p>
                            )}
                            {recipe.dishTypes.length > 0 && (
                                <motion.p variants={itemVariants}>
                                    Dish Types: {recipe.dishTypes.join(', ')}
                                </motion.p>
                            )}
                            {recipe.diets.length > 0 && (
                                <motion.p variants={itemVariants}>
                                    Diets: {recipe.diets.join(', ')}
                                </motion.p>
                            )}
                            {recipe.occasions.length > 0 && (
                                <motion.p variants={itemVariants}>
                                    Occasions: {recipe.occasions.join(', ')}
                                </motion.p>
                            )}
                        </motion.div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <motion.h2 
                            className="text-xl font-semibold mb-3"
                            variants={itemVariants}
                        >
                            Source Information
                        </motion.h2>
                        <motion.div 
                            className="space-y-2"
                            variants={itemVariants}
                        >
                            <motion.p variants={itemVariants}>
                                Source: {recipe.sourceName}
                            </motion.p>
                            <motion.p variants={itemVariants}>
                                License: {recipe.license}
                            </motion.p>
                            <motion.p variants={itemVariants}>
                                <motion.a 
                                    href={recipe.sourceUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    View Original Recipe
                                </motion.a>
                            </motion.p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
