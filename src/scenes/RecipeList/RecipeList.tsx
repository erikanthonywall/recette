import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import _filter from 'lodash/filter';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faFrown } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { getRecipes } from '../../utils';

import RecipeListItem from './RecipeListItem';
import IconButton from '../../components/IconButton/IconButton';
import FloatingActionButton from  '../../components/FloatingActionButton/FloatingActionButton';

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	
	scrollview: {
		padding: 8,
		paddingBottom: 50,
		marginBottom: 1,
		flex: 1
	},

	searchBar: {
		flexDirection: 'row',
		marginLeft: 16,
		marginRight: 16,
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
			<>
				<View style={styles.searchBar}>
					<TextInput placeholder="Search..." style={styles.search} value={search} onChangeText={(text) => setSearch(text)} />
					{
						search.length ?
						<IconButton icon={faTimes} onPress={() => setSearch('')} />
						: null
					}
				</View>

				<ScrollView style={styles.scrollview}>
					{
						filteredRecipes.map((recipe, i) => (
							<RecipeListItem name={recipe.name} key={i} />
						))
					}

					<View style={{ height: 100 }}></View>
				</ScrollView>
			</>
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