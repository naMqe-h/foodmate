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

interface AdvancedSearchParams {
  ingredients?: string[];
  cuisines?: string[];
  nutrients?: {
    [key: string]: number;
  };
}

export async function searchRecipesWithFilters(params: AdvancedSearchParams) {
  try {
    const queryParams = new URLSearchParams();
    
    // Add base params
    queryParams.append('apiKey', API_KEY || '');
    queryParams.append('number', '20');
    queryParams.append('addRecipeInformation', 'true');
    queryParams.append('fillIngredients', 'true');

    if (params.ingredients?.length) {
      queryParams.append('includeIngredients', params.ingredients.join(','));
    }

    if (params.cuisines?.length) {
      queryParams.append('cuisine', params.cuisines.join(','));
    }

    if (params.nutrients) {
      Object.entries(params.nutrients).forEach(([nutrient, value]) => {
        queryParams.append(`min${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}`, '0');
        queryParams.append(`max${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}`, value.toString());
      });
    }

    console.log(queryParams.toString());
    const response = await fetch(
      `${BASE_URL}/recipes/complexSearch?${queryParams.toString()}`,
      { next: { revalidate: 0 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }

    const data: { results: IRecipe[] } = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching recipes with filters:', error);
    return [];
  }
}
