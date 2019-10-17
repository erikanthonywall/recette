import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert } from 'react-native';
import { useRouteMatch, useHistory } from 'react-router-native';
import { getRecipeById, deleteRecipeById, convertRecipeNameToId } from '../../utils';
import { IRecipe } from '../../types';
import IconButton from '../../components/IconButton/IconButton';
import { faEllipsisV, faEdit, faTrashAlt, faShoppingBasket, faCamera } from '@fortawesome/free-solid-svg-icons';
import Popover from '../../components/Popover/Popover';

import globalStyles from '../../styles';

const styles = StyleSheet.create({
	scrollview: {
		padding: 16
	},

	titleRow: {
		flexDirection: 'row'
	},

	title: {
		...globalStyles.header1,
		flex: 1
	},

	ingredient: {
		...globalStyles.body,
		marginBottom: 8
	}
});

const Recipe = (() => {
	const match = useRouteMatch();
	const history = useHistory();
	const [recipe, setRecipe] = useState<IRecipe>(null);
	const [popoverVisible, setPopoverVisible] = useState<boolean>(false);
	const [popoverLayout, setPopoverLayout] = useState(null);

	useEffect(() => {
		const getRecipe = async () => {
			return await getRecipeById(match.params.recipeId);
		};

		getRecipe().then((recipe) => {
			if (recipe) {
				setRecipe(recipe);
			} else {
				alert('Recipe not found.');
			}
		});
	}, []);

	const getPopoverLayout = (e) => {
		setPopoverLayout(e.nativeEvent.layout);
	};

	const deleteRecipe = () => {
		Alert.alert(
			'',
			'Are you sure you want to delete this recipe?',
			[{
				text: 'Cancel',
				onPress: () => {},
				style: 'cancel'
			}, {
				text: 'Delete Recipe',
				onPress: confirmDeleteRecipe
			}]
		)
	};

	const confirmDeleteRecipe = () => {
		const id = convertRecipeNameToId(recipe.name);
		deleteRecipeById(id).then((res) => {
			if (!res.success) {
				alert(res.message);
			} else {
				history.replace('/');
			}
		})
	};

	if (recipe) {
		return (
			<View style={{ flex: 1 }}>
				<ScrollView style={styles.scrollview} onTouchStart={() => setPopoverVisible(false)}>
					<View style={styles.titleRow}>
						<Text style={styles.title}>{recipe.name}</Text>

						<View onLayout={getPopoverLayout}>
							<IconButton
								icon={faEllipsisV}
								onPress={() => setPopoverVisible(true)} />
						</View>
					</View>

					<View style={globalStyles.hr}></View>

					<Text style={globalStyles.header2}>Ingredients</Text>

					<View>
						{
							recipe.ingredients.map((ingredient, i) => {
								return (
									<Text style={styles.ingredient}>
										{ingredient.quantity} {ingredient.ingredient}
									</Text>
								)
							})
						}
					</View>

					<Text style={globalStyles.header2}>Steps</Text>
					
					<View>
						{
							recipe.steps.map((step, i) => {
								return (
									<Text style={styles.ingredient}>
										{i + 1}.) {step}
									</Text>
								)
							})
						}
					</View>

					<View style={{ height: 50 }}></View>

				</ScrollView>
				
				<Popover
					actions={[{
						icon: faEdit,
						onPress: () => { alert('Edit recipe')},
						text: 'Edit Recipe'
					}, {
						icon: faShoppingBasket,
						onPress: () => { alert('add to shopping list')},
						text: 'Add to Shopping List'
					}, {
						icon: faCamera,
						onPress: () => { alert('take photo')},
						text: 'Take Photo'
					}, {
						icon: faTrashAlt,
						onPress: deleteRecipe,
						text: 'Delete Recipe'
					}]}
					visible={popoverVisible}
					layout={popoverLayout}
					onRequestClose={() => setPopoverVisible(false)}
				/>
			</View>
		)
	}

	return null;
});

export default Recipe;