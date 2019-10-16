import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useRouteMatch } from 'react-router-native';
import { getRecipeById } from '../../utils';
import { IRecipe } from '../../types';
import IconButton from '../../components/IconButton/IconButton';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
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
	}
});

const Recipe = (() => {
	const match = useRouteMatch();
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
				</ScrollView>
				
				<Popover
					actions={[{
						icon: faEllipsisV,
						onPress: () => { alert('sup')},
						text: 'hello'
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