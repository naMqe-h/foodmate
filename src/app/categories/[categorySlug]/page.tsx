import { getRecipesByCategory } from "@/utils/api";
import Link from "next/link";

export const revalidate = 0;

export default async function CategoryPage({ params, searchParams }: { params: Promise<{ categorySlug: string }>, searchParams: Promise<{ id: string }> }) {
    const { categorySlug } = await params;
    const { id } = await searchParams;

    const recipes = await getRecipesByCategory(categorySlug, id);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <Link 
                    href="/categories"
                    className="inline-block mb-4 text-orange-600 hover:text-orange-800"
                >
                    ← Back to Categories
                </Link>

                <h1 className="text-3xl font-bold mb-8 text-center capitalize">
                    {categorySlug.replace('-', ' ')}: {id}
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {recipes.map((recipe) => (
                        <Link href={`/recipes/${recipe.id}`}>
                            <div key={recipe.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <img 
                                    src={recipe.image} 
                                    alt={recipe.title}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <h2 className="font-medium text-center">{recipe.title}</h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
