import { IRecipe } from "@/utils/interfaces";

export default function Badges({ recipe }: { recipe: IRecipe }) {
    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {recipe.vegetarian && (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Vegetarian</span>
            )}
            {recipe.vegan && (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Vegan</span>
            )}
            {recipe.glutenFree && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Gluten Free</span>
            )}
            {recipe.dairyFree && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Dairy Free</span>
            )}
            {recipe.veryHealthy && (
                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">Very Healthy</span>
            )}
            {recipe.lowFodmap && (
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Low FODMAP</span>
            )}
        </div>
    )
}