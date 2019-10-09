import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Link } from 'react-router-native';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../IconButton/IconButton';

interface IProps {
	name: string
}

const styles = StyleSheet.create({
	card: {
		height: 160,
		flexDirection: 'column',
		borderColor: '1px solid rgba(0, 0, 0, 0.4)',
		borderWidth: 1,
		padding: 8,
		borderRadius: 4
	},

	content: {
		flex: 1
	},

	buttonBar: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: 40
	},

	name: {
		fontFamily: 'IMFellFrenchCanon-Regular',
		fontSize: 24,
		color: 'rgba(0, 0, 0, 0.8)'
	}
});

const RecipeListItem = ({ name } : IProps) => {
	const addRecipeToShoppingList = () => {};

	return (
		<View style={styles.card}>
			<View style={styles.content}>
				<Text style={styles.name}>{name}</Text>
			</View>

			<View style={styles.buttonBar}>
				<IconButton
					icon={faShoppingBasket}
					onPress={addRecipeToShoppingList} />
			</View>
		</View>
	)
}

export default RecipeListItem;