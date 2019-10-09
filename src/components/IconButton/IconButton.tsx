import React from 'react';
import { TouchableHighlight, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

interface IProps {
	icon: any,
	onPress(): void
}

const styles = StyleSheet.create({
	button: {
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
});

const IconButton = ({ icon, onPress } : IProps) => {
	return (
		<TouchableHighlight style={styles.button} underlayColor="rgba(0, 0, 0, 0.4)" onPress={onPress}>
			<FontAwesomeIcon icon={icon} color="rgba(0, 0, 0, 0.8)" size={24} />
		</TouchableHighlight>
	)
}

export default IconButton;