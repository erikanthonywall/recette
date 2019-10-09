import { AsyncStorage } from 'react-native';
import {
	IRecipe, IIngredient
} from '../types';

export const getRecipes = async () : Promise<Array<IRecipe>> => {
	try {
		const recipes = await AsyncStorage.getItem('recipes');
		
		if (recipes) {
			return JSON.parse(recipes);
		}

		return [];

		return [{
			name: 'Black Bean Quinoa Burgers',
			ingredients: [],
			steps: []
		}];
	} catch {
		return [];
	}
}