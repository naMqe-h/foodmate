import { IRecipe } from "@/utils/interfaces";

export default function BasicInformations({ recipe }: { recipe: IRecipe }) {
    return (
        <>
            <h2 className="text-xl font-semibold mb-3">Basic Information</h2>
            <ul className="space-y-2">
                <li><span className="font-semibold">Servings:</span> {recipe.servings}</li>
                <li><span className="font-semibold">Ready in:</span> {recipe.readyInMinutes} minutes</li>
                <li><span className="font-semibold">Preparation time:</span> {recipe.preparationMinutes ? `${recipe.preparationMinutes} minutes` : '-'}</li>
                <li><span className="font-semibold">Cooking time:</span> {recipe.cookingMinutes ? `${recipe.cookingMinutes} minutes` : '-'}</li>
                <li><span className="font-semibold">Rating:</span> {recipe.spoonacularScore.toFixed(2)}</li>
                <li><span className="font-semibold">Health score:</span> {recipe.healthScore.toFixed(2)}</li>
                <li><span className="font-semibold">Weight Watcher points:</span> {recipe.weightWatcherSmartPoints.toFixed(2)}</li>

            </ul>

        </>
    )
}