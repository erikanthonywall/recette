import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle, faArrowRight, faCheck, faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons';

import { IIngredient } from '../../types';
import FloatingActionButton from '../FloatingActionButton/FloatingActionButton';
import { saveRecipe } from '../../utils';

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	
	page: {
		flex: 1,
		justifyContent: 'center'
	},

	pageScroller: {
		padding: 16
	},

	pageScrollerSpacer: {
		height: 100
	},

	titleInput: {
		fontSize: 24,
		textAlign: 'center',
		borderBottomColor: '#ccc',
		borderBottomWidth: 1
	},

	textInput: {
		fontSize: 16,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1
	},

	ingredientItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},

	ingredientItemText: {
		fontFamily: 'IMFellFrenchCanon-Regular',
		fontSize: 18,
		color: 'rgba(0, 0, 0, 0.8)',
		paddingTop: 4,
		paddingBottom: 6
	},

	recipeStepsItem: {
		flexDirection: 'row'
	},

	recipeStepsItemText: {
		flex: 1,
		fontFamily: 'IMFellFrenchCanon-Regular',
		fontSize: 18,
		color: 'rgba(0, 0, 0, 0.8)',
		paddingTop: 4,
		paddingBottom: 16
	}
});

const NewRecipe = () => {
	const [page, setPage] = useState<number>(0);
	const [recipeTitle, setRecipeTitle] = useState<string>('');
	const [ingredient, setIngredientName] = useState<string>('');
	const [quantity, setQuantity] = useState<string>('');
	const [ingredientList, setIngredientList] = useState<Array<IIngredient>>([]);
	const [step, setStep] = useState<string>('');
	const [recipeSteps, setRecipeSteps] = useState<Array<string>>([]);
	const history = useHistory();

	let ingredientNameInput;
	let ingredientQuantityInput;

	const addIngredientToList = () => {
		setIngredientList([
			...ingredientList,
			{
				quantity,
				ingredient
			}
		]);

		setIngredientName('');
		setQuantity('');
		ingredientNameInput.focus();
	};

	const removeIngredientFromList = (i : number) => {
		setIngredientList([
			...ingredientList.slice(0, i),
			...ingredientList.slice(i + 1)
		]);
	};

	const addStepToRecipe = () => {
		setRecipeSteps([
			...recipeSteps,
			step
		]);

		setStep('');
	};

	const removeStepFromRecipe = (i : number) => {
		setRecipeSteps([
			...recipeSteps.slice(0, i),
			...recipeSteps.slice(i + 1)
		]);
	};

	const saveRecipeToStorage = () => {
		saveRecipe({
			name: recipeTitle,
			ingredients: ingredientList,
			steps: recipeSteps
		}).then((res) => {
			if (res.success) {
				history.replace('/');
			} else {
				alert(res.message);
			}
		});
	};

	return (
		<View style={styles.container}>
			{
				page === 0 ?
				<View style={styles.page}>
					<TextInput
						placeholder="Enter the name of the recipe"
						style={styles.titleInput}
						value={recipeTitle}
						onChangeText={(text) => setRecipeTitle(text)} />
					
					<FloatingActionButton icon={faArrowRight} disabled={!recipeTitle} onPress={() => setPage(1)} />
				</View>
				
				: page === 1 ?

				<View style={styles.page}>
					<View style={{ flexDirection: 'row', padding: 16, alignItems: 'center' }}>
						<View style={{ flex: 1, justifyContent: 'flex-start' }}>
							<TextInput
								placeholder="Ingredient name"
								style={styles.textInput}
								value={ingredient}
								ref={(ref) => ingredientNameInput = ref}
								onChangeText={(text) => setIngredientName(text)}
								onSubmitEditing={() => ingredientQuantityInput.focus()} />
							
							<TextInput
								placeholder="Quantity"
								style={styles.textInput}
								value={quantity}
								ref={(ref) => ingredientQuantityInput = ref}
								onChangeText={(text) => setQuantity(text)}
								onSubmitEditing={addIngredientToList} />
						</View>

						<View style={{ marginLeft: 16 }}>
							<FloatingActionButton
								icon={faCheck}
								isMini={true}
								position="relative"
								disabled={!ingredient || !quantity}
								onPress={addIngredientToList} />
						</View>
					</View>

					<ScrollView style={styles.pageScroller} bounces={true}>
						{
							ingredientList.length ?
							
							ingredientList.map((ing, i) => (
								<View key={i} style={styles.ingredientItem}>
									<FontAwesomeIcon icon={faCircle} color="rgba(0, 0, 0, 0.8)" size={8} style={{ marginRight: 10 }} />
									<Text style={styles.ingredientItemText}>{ing.quantity} {ing.ingredient}</Text>
									<View style={{ flex: 1 }}></View>
									<TouchableOpacity onPress={() => removeIngredientFromList(i)}>
										<FontAwesomeIcon icon={faTimes} color="rgba(0, 0, 0, 0.8)" style={{ marginRight: 10 }} />
									</TouchableOpacity>
								</View>
							))

							:

							<Text style={styles.ingredientItemText}>Add some ingredients.</Text>
						}
						<View style={styles.pageScrollerSpacer}></View>
					</ScrollView>
					
					<FloatingActionButton icon={faArrowLeft} position="left" onPress={() => setPage(0)} />
					<FloatingActionButton icon={faArrowRight} onPress={() => setPage(2)} />
				</View>
				
				: page === 2 ?
				
				<View style={styles.page}>
					<View style={{ flexDirection: 'row', padding: 16, alignItems: 'center' }}>
						<View style={{ flex: 1, justifyContent: 'flex-start' }}>
							<TextInput
								placeholder="Preheat oven to 350° fahrenheit..."
								style={styles.textInput}
								value={step}
								multiline
								ref={(ref) => ingredientNameInput = ref}
								onChangeText={(text) => setStep(text)}
								onSubmitEditing={addStepToRecipe} />
						</View>

						<View style={{ marginLeft: 16 }}>
							<FloatingActionButton
								icon={faCheck}
								isMini={true}
								position="relative"
								disabled={!step}
								onPress={addStepToRecipe} />
						</View>
					</View>

					<ScrollView style={styles.pageScroller} bounces={true}>
						{
							recipeSteps.length ?
							
							recipeSteps.map((step, i) => (
								<View key={i} style={styles.recipeStepsItem}>
									<Text style={styles.recipeStepsItemText}>
										{i + 1}.) {step}
									</Text>

									<TouchableOpacity style={{ marginTop: 8, marginLeft: 8 }} onPress={() => removeStepFromRecipe(i)}>
										<FontAwesomeIcon icon={faTimes} color="rgba(0, 0, 0, 0.8)" style={{ marginRight: 10 }} />
									</TouchableOpacity>
								</View>
							))

							:

							<Text style={styles.ingredientItemText}>Add some steps.</Text>
						}
						<View style={styles.pageScrollerSpacer}></View>
					</ScrollView>

					<FloatingActionButton icon={faArrowLeft} position="left" onPress={() => setPage(1)} />
					<FloatingActionButton icon={faCheck} onPress={saveRecipeToStorage} />
				</View>

				: null
			}
		</View>
	);
}

export default NewRecipe;