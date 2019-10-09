import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import _filter from 'lodash/filter';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faFrown } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { getRecipes } from '../../utils';

import RecipeListItem from './RecipeListItem';
import IconButton from '../IconButton/IconButton';
import FloatingActionButton from  '../FloatingActionButton/FloatingActionButton';

const styles = StyleSheet.create({
	scrollview: {
		padding: 8
	},

	searchBar: {
		flexDirection: 'row',
		height: 40,
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(0, 0, 0, 0.4)',
		marginBottom: 8
	},

	search: {
		flex: 1
	},

	noRecipesContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},

	container: {
		flex: 1
	},

	newRecipeButtonTouchable: {
		bottom: 16,
		right: 16,
		position: 'absolute',
	},

	newRecipeButton: {
		height: 56,
		width: 56,
		borderRadius: 28,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#26c6da'
	}
});

const RecipeList = () => {
	const [recipes, setRecipes] = useState([]);
	const [search, setSearch] = useState('');
	const [fetchDone, setFetchDone] = useState<boolean>(false);
	const history = useHistory();

	useEffect(() => {
		const fetchRecipes = async () => {
			const recipes = await getRecipes();
			setRecipes(recipes);
		}

		fetchRecipes().then(() => {
			setFetchDone(true);
		});
	}, []);

	const onPressNewRecipe = () => {
		history.push('/newrecipe');
	};

	const filteredRecipes = _filter(recipes, (recipe) => {
		if (!search) return true;
		return recipe.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
	});

	let content;

	if (!fetchDone) {
		content = null;
	} else if (!filteredRecipes.length) {
		content = (
			<View style={styles.noRecipesContainer}>
				<FontAwesomeIcon icon={faFrown} color="rgba(0, 0, 0, 0.8)" size={48} />
				<Text>No Recipes</Text>
			</View>
		)
	} else {
		content = (
			<ScrollView style={styles.scrollview}>
				<View style={styles.searchBar}>
					<TextInput placeholder="Search..." style={styles.search} value={search} onChangeText={(text) => setSearch(text)} />
					{
						search.length ?
						<IconButton icon={faTimes} onPress={() => setSearch('')} />
						: null
					}
				</View>
				{
					filteredRecipes.map((recipe, i) => (
						<RecipeListItem name={recipe.name} key={i} />
					))
				}
			</ScrollView>
		);
	}

	return (
		<View style={styles.container}>
			{content}
			<FloatingActionButton icon={faPlus} onPress={onPressNewRecipe} />
		</View>
	);
}

export default RecipeList;