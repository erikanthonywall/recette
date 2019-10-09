import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, TextInput, Text } from 'react-native';
import _filter from 'lodash/filter';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFrown } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { getRecipes } from '../../utils';

import RecipeListItem from './RecipeListItem';
import IconButton from '../IconButton/IconButton';

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
	}
});

const RecipeList = () => {
	const [recipes, setRecipes] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		const fetchRecipes = async () => {
			const recipes = await getRecipes();
			setRecipes(recipes);
		}

		fetchRecipes();
	}, []);

	const filteredRecipes = _filter(recipes, (recipe) => {
		if (!search) return true;
		return recipe.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
	});

	if (!filteredRecipes.length) {
		return (
			<View style={styles.noRecipesContainer}>
				<FontAwesomeIcon icon={faFrown} color="rgba(0, 0, 0, 0.8)" size={48} />
				<Text>No Recipes</Text>
			</View>
		)
	}

	return (
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

export default RecipeList;