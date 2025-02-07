import { IRecipe } from "@/utils/interfaces";

export default function BasicInformations({ recipe }: { recipe: IRecipe }) {
    return (
        <>
            <h2 className="text-xl font-semibold mb-3">Basic Information</h2>
            <ul className="space-y-2">
                <li>Servings: {recipe.servings}</li>
                <li>Ready in: {recipe.readyInMinutes} minutes</li>
                <li>Preparation time: {recipe.preparationMinutes ? `${recipe.preparationMinutes} minutes` : '-'}</li>
                <li>Cooking time: {recipe.cookingMinutes ? `${recipe.cookingMinutes} minutes` : '-'}</li>
                <li>Health score: {recipe.healthScore}</li>
                <li>Weight Watcher points: {recipe.weightWatcherSmartPoints}</li>
            </ul>
        </>
    )
}