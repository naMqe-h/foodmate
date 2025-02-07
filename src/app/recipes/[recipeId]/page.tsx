import Badges from '@/components/recipe/Badges';
import BasicInformations from '@/components/recipe/BasicInformations';
import Ingredient from '@/components/recipe/Ingredient';
import { getRecipeById } from '@/utils/api';
import { IRecipe } from '@/utils/interfaces';
import Image from 'next/image';

export default async function RecipePage({ params }: { params: Promise<{ recipeId: string }> }) {
    const { recipeId } = await params;
    const recipe: IRecipe = await getRecipeById(recipeId);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="relative h-[400px] w-full">
                        <Image
                            src={recipe.image}
                            alt={recipe.title}
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
                        <Badges recipe={recipe} />
                        <BasicInformations recipe={recipe} />
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">Summary</h2>
                    <p dangerouslySetInnerHTML={{ __html: recipe.summary }} className="text-gray-700" />
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
                    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {recipe.extendedIngredients
                            .filter(ingredient => ingredient.id !== -1)
                            .map((ingredient) => (
                                <Ingredient key={ingredient.id} ingredient={ingredient} />
                            ))}
                    </ul>
                </div>

                <div className="mb-8">
                    {recipe.analyzedInstructions.map((instruction, index) => (
                        <details key={index} className="mb-4">
                            <summary className="cursor-pointer font-medium hover:text-gray-700 transition-colors text-xl font-semibold mb-3">
                                {instruction.name || `Instructions Set ${index + 1}`}
                            </summary>
                            <div className="mt-4 pl-4">
                                {instruction.steps.map((step) => (
                                    <div key={step.number} className="mb-4">
                                        <p className="font-medium">Step {step.number}</p>
                                        <p className="text-gray-700">{step.step}</p>
                                    </div>
                                ))}
                            </div>
                        </details>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-3">Categories</h2>
                        <div className="space-y-2">
                            {recipe.cuisines.length > 0 && (
                                <p>Cuisines: {recipe.cuisines.join(', ')}</p>
                            )}
                            {recipe.dishTypes.length > 0 && (
                                <p>Dish Types: {recipe.dishTypes.join(', ')}</p>
                            )}
                            {recipe.diets.length > 0 && (
                                <p>Diets: {recipe.diets.join(', ')}</p>
                            )}
                            {recipe.occasions.length > 0 && (
                                <p>Occasions: {recipe.occasions.join(', ')}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-3">Source Information</h2>
                        <div className="space-y-2">
                            <p>Source: {recipe.sourceName}</p>
                            <p>License: {recipe.license}</p>
                            <p>
                                <a 
                                    href={recipe.sourceUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    View Original Recipe
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}