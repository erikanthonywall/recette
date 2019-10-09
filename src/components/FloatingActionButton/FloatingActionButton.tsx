import React from 'react';
import {
	TouchableOpacity,
	View,
	StyleSheet
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

type Position = 'left' | 'right' | 'relative';

interface IProps {
	icon: any,
	position?: Position,
	disabled?: boolean,
	isMini?: boolean
	onPress(): void
}

const styles = StyleSheet.create({
	fabTouchable: {
		bottom: 16,
		position: 'absolute',
	},

	fab: {
		height: 56,
		width: 56,
		borderRadius: 28,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#26c6da'
	}
});

const FloatingActionButton = ({
	icon,
	position = 'right',
	disabled,
	isMini = false,
	onPress
} : IProps) => {
	let pos = {};

	if (position === 'right') {
		pos = {
			position: 'absolute',
			bottom: 16,
			right: 16
		};
	} else if (position === 'left') {
		pos = {
			position: 'absolute',
			bottom: 16,
			left: 16
		};
	} else if (position === 'relative') {
		pos = {
		
		};
	}

	let buttonStyle = {...styles.fab};

	if (disabled) {
		buttonStyle = {
			...buttonStyle,
			backgroundColor: '#ccc'
		};
	}

	if (isMini) {
		buttonStyle = {
			...buttonStyle,
			width: 40,
			height: 40,
			borderRadius: 20
		};
	}

	return (
		<TouchableOpacity style={pos} onPress={onPress} disabled={disabled}>
			<View style={buttonStyle}>
				<FontAwesomeIcon icon={icon} color="#fff" size={24} />
			</View>
		</TouchableOpacity>
	);
}

export default FloatingActionButton;