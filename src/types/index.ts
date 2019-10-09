export interface IIngredient {
	quantity: string,
	ingredient: string
}

export interface IRecipe {
	name: string,
	ingredients: Array<IIngredient>,
	steps: Array<string>
}

export interface IResult {
	success: boolean,
	message: string
}