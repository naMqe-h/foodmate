"use client"

import { CUISINES, DIETS, MEAL_TYPES, INTOLERANCES } from "@/utils/config";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Categories() {
    const categories = {
        cuisines: {
            slug: "cuisines",
            items: CUISINES
        },
        "dish-types": {
            slug: "dish-types",
            items: MEAL_TYPES
        },
        diets: {
            slug: "diet",
            items: DIETS
        },
        intolerances: {
            slug: "intolerances",
            items: INTOLERANCES
        }

    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
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
                <motion.h1 
                    className="text-3xl font-bold mb-8 text-center"
                    variants={itemVariants}
                >
                    Recipe Categories
                </motion.h1>

                {Object.entries(categories).map(([categoryType, object]) => (
                    <motion.div 
                        key={categoryType}
                        className="mb-8"
                        variants={itemVariants}
                    >
                        <motion.h2 
                            className="text-2xl font-semibold mb-4 capitalize"
                            variants={itemVariants}
                        >
                            {categoryType.replace(/([A-Z])/g, ' $1').trim()}
                        </motion.h2>
                        <motion.div 
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                            variants={itemVariants}
                        >
                            {object.items.map((item) => (
                                <Link 
                                    key={item} 
                                    href={`/categories/${categoryType}?id=${encodeURIComponent(item.toLowerCase())}`}
                                >
                                    <motion.div
                                        className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 cursor-pointer transition-colors"

                                        whileHover={{ 
                                            scale: 1.05,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        <span className="font-medium">{item}</span>
                                    </motion.div>
                                </Link>
                            ))}
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}
