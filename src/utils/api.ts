import { IRecipe } from './interfaces';
import { API_KEY, BASE_URL } from './config';

export async function getRandomRecipes(number: number = 2): Promise<IRecipe[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/recipes/random?apiKey=${API_KEY}&number=${number}`,
      { next: { revalidate: 600 } }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }

    const data: { recipes: IRecipe[] } = await response.json();

    return data.recipes
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    return [];
  }
}

export async function getRecipeById(id: string): Promise<IRecipe> {
  try {
    const response = await fetch(
      `${BASE_URL}/recipes/${id}/information?apiKey=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch recipe');
    }

    const recipe: IRecipe = await response.json();
    return recipe;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error;
  }
}

export async function getRecipesByCategory(category: string, id: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&${category}=${id}&sort=random&number=20`,
      { next: { revalidate: 0 } }
    );


    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }

    const data: { results: { id: number, title: string, image: string, imageType: string }[] } = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching recipes by category:', error);
    return [];
  }
}

export async function searchRecipes(query: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&number=20&addRecipeInformation=true`,
      { next: { revalidate: 0 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }

    const data: { results: IRecipe[] } = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching recipes:', error);
    return [];
  }
}
