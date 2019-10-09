export interface IIngredient {
	quantity: string,
	ingredient: string
}

export interface IRecipe {
	name: string,
	ingredients: Array<IIngredient>,
	steps: Array<string>
}