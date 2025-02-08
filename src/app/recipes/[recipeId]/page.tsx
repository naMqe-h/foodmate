import { getRecipeById } from '@/utils/api';
import { IRecipe } from '@/utils/interfaces';
import Recipe from '@/components/recipe/Recipe';

export default async function RecipePage({ params }: { params: Promise<{ recipeId: string }> }) {
    const { recipeId } = await params;
    const recipe: IRecipe = await getRecipeById(recipeId);

    return (
        <Recipe recipe={recipe} />
    )
}