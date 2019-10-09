import { AsyncStorage } from 'react-native';
import { IRecipe, IIngredient, IResult } from '../types';
import _find from 'lodash/find';

export const getRecipes = async () : Promise<Array<IRecipe>> => {
	try {
		const recipes = await AsyncStorage.getItem('recipes');
		
		if (recipes) {
			return JSON.parse(recipes);
		}

		return [];
	} catch {
		return [];
	}
}

export const saveRecipe = async (recipe : IRecipe) : Promise<IResult> => {
	try {
		let recipes = await getRecipes();

		const id = convertRecipeNameToID(recipe.name);

		if (_find(recipes, (r => {
			return convertRecipeNameToID(r.name) === id
		}))) {
			return {
				success: false,
				message: 'A recipe with this name already exists.'
			};
		}

		recipes = [
			...recipes,
			recipe
		];

		await AsyncStorage.setItem('recipes', JSON.stringify(recipes));
		
		return {
			success: true,
			message: ''
		};
	} catch {
		return {
			success: false,
			message: 'Failed to save recipe.'
		};
	}
}

export const convertRecipeNameToID = (name: string) : string => {
	return name.toLowerCase().split(' ').join('-');
}