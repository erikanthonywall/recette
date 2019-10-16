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

import globalStyles from '../../styles';

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
		paddingLeft: 16,
		paddingRight: 16,
		paddingTop: 8
	},

	hr: {
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		marginTop: 4,
		height: 1
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

	let headerVisible = false;

	if (location.pathname === '/' || location.pathname === '/shopping') {
		headerVisible = true;
	}

	if (!headerVisible) {
		return null;
	}

	let faIcon = location.pathname === '/shopping' ? faPizzaSlice : faShoppingBasket;
	let redirect = location.pathname === '/shopping' ? '/' : '/shopping';

	const onPress = () => {
		history.replace(redirect);

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
		<>
		<View style={styles.header}>
			<Text style={globalStyles.header1}>Recette.</Text>
			<Animated.View style={{ transform: [{ rotateX: spin }, { perspective: 1000 }] }}>
				<TouchableHighlight style={styles.button} underlayColor="rgba(0, 0, 0, 0.4)" onPress={onPress}>
					<FontAwesomeIcon icon={faIcon} color="rgba(0, 0, 0, 0.8)" size={24} />
				</TouchableHighlight>
			</Animated.View>
		</View>
		<View style={styles.hr}></View>
		</>
	)
}

export default Header;