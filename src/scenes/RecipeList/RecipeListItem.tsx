import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { useHistory } from 'react-router-native';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../../components/IconButton/IconButton';
import { convertRecipeNameToId } from '../../utils';

import globalStyles from '../../styles';

interface IProps {
	name: string
}

const styles = StyleSheet.create({
	card: {
		height: 140,
		flexDirection: 'column',
		borderColor: '1px solid rgba(0, 0, 0, 0.4)',
		borderWidth: 1,
		padding: 8,
		borderRadius: 4,
		marginBottom: 16
	},

	content: {
		flex: 1
	},

	buttonBar: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: 40
	}
});

const RecipeListItem = ({ name } : IProps) => {
	const history = useHistory();

	const addRecipeToShoppingList = () => {
		
	};

	const goToRecipe = () => {
		const recipeId = convertRecipeNameToId(name);
		history.push('/recipe/' + recipeId);
	}

	return (
		<TouchableWithoutFeedback onPress={goToRecipe}>
			<View style={styles.card}>
				<View style={styles.content}>
					<Text style={globalStyles.header2}>{name}</Text>
				</View>

				<View style={styles.buttonBar}>
					<IconButton
						icon={faShoppingBasket}
						onPress={addRecipeToShoppingList} />
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default RecipeListItem;