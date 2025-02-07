import { IRandomRecipe } from './interfaces';
import { API_KEY, BASE_URL } from './config';

export async function getRandomRecipes(number: number = 2): Promise<IRandomRecipe[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/random?apiKey=${API_KEY}&number=${number}`,
      { next: { revalidate: 600 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }

    const data: { recipes: IRandomRecipe[] } = await response.json();

    return data.recipes
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    return [];
  }
}