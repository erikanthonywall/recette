import React, { useState } from 'react';
import {
	View,
	Text,
	TouchableHighlight,
	StyleSheet,
	Animated
} from 'react-native';
import { useHistory, useLocation } from 'react-router-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShoppingBasket, faPizzaSlice } from '@fortawesome/free-solid-svg-icons';

const styles = StyleSheet.create({
	button: {
		width: 50,
		height: 50,
		borderRadius: 25,
		alignItems: 'center',
		justifyContent: 'center'
	},

	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16
	},

	logo: {
		fontFamily: 'IMFellFrenchCanon-Regular',
		fontSize: 36,
		color: 'rgba(0, 0, 0, 0.8)'
	}
});

const Header = () => {
	const history = useHistory();
	const location = useLocation();
	
	const [spinAnimation, setSpinAnimation] = useState(new Animated.Value(0));
	
	const spin = spinAnimation.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg']
	});

	let faIcon = location.pathname === '/shopping' ? faPizzaSlice : faShoppingBasket;
	let redirect = location.pathname === '/shopping' ? '/' : '/shopping';

	const onPress = () => {
		history.push(redirect);

		Animated.timing(
			spinAnimation,
			{
				toValue: 1,
				duration: 400
			}
		).start(() => {
			setSpinAnimation(new Animated.Value(0));
		});
	}

	return (
		<View style={styles.header}>
			<Text style={styles.logo}>Recette.</Text>
			<Animated.View style={{ transform: [{ rotateX: spin }, { perspective: 1000 }] }}>
				<TouchableHighlight style={styles.button} underlayColor="rgba(0, 0, 0, 0.4)" onPress={onPress}>
					<FontAwesomeIcon icon={faIcon} color="rgba(0, 0, 0, 0.8)" size={24} />
				</TouchableHighlight>
			</Animated.View>
		</View>
	)
}

export default Header;