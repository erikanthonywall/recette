import { AsyncStorage } from 'react-native';
import { IRecipe, IIngredient, IResult } from '../types';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';

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

export const getRecipeById = async (id) : Promise<IRecipe> => {
	try {
		const recipes = await getRecipes();

		if (recipes && recipes.length) {
			const recipe = _find(recipes, (r) => {
				return convertRecipeNameToId(r.name) === id;
			});

			if (recipe) return recipe;
		}

		return null;
	} catch {
		return null;
	}
}

export const deleteRecipeById = async (id) : Promise<IResult> => {
	try {
		const recipes = await getRecipes();

		if (recipes && recipes.length) {
			const index = _findIndex(recipes, (r) => {
				return convertRecipeNameToId(r.name) === id
			});

			if (index >= 0) {
				const newRecipes = [
					...recipes.slice(0, index),
					...recipes.slice(index + 1)
				];

				await AsyncStorage.setItem('recipes', JSON.stringify(newRecipes));

				return {
					success: true,
					message: ''
				};
			}
		}

		return {
			success: false,
			message: 'Failed to delete recipe.'
		};
	} catch (e) {
		return {
			success: false,
			message: 'Failed to delete recipe.'
		};
	}
}

export const saveRecipe = async (recipe : IRecipe) : Promise<IResult> => {
	try {
		let recipes = await getRecipes();

		const id = convertRecipeNameToId(recipe.name);

		if (_find(recipes, (r => {
			return convertRecipeNameToId(r.name) === id
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

export const addRecipeToShoppingList = async (id) => {
	
}

export const convertRecipeNameToId = (name: string) : string => {
	return name.toLowerCase().split(' ').join('-');
}