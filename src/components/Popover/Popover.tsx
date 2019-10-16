import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Animated } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const POPOVER_WIDTH = 260;

interface IPopoverAction {
	icon: any,
	text: string,
	onPress(): void
}

interface IPopoverLayout {
	x: number,
	y: number,
	width: number,
	height: number
}

interface IProps {
	actions: Array<IPopoverAction>,
	visible: boolean,
	layout: IPopoverLayout,
	onRequestClose(): void
}

interface IPopoverActionProps {
	action: IPopoverAction,
	onRequestClose(): void
}

const styles = StyleSheet.create({
	popover: {
		width: POPOVER_WIDTH,
		backgroundColor: '#fff',
		position: 'absolute',
		top: 0,
		left: 0,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},

	action: {
		flexDirection: 'row',
		padding: 8,
		alignItems: 'center'
	},

	actionText: {
		color: 'rgba(0, 0, 0, 0.8)',
		fontSize: 18,
		marginLeft: 8
	}
});

const Popover = ({ actions, visible, layout, onRequestClose }: IProps) => {
	const [scaleAnimation] = useState(new Animated.Value(0));
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (visible) {
			console.log('visible')
			Animated.timing(
				scaleAnimation,
				{
					toValue: 1,
					duration: 200
				}
			).start();

			setIsVisible(true);
		} else {
			console.log('not visible')
			Animated.timing(
				scaleAnimation,
				{
					toValue: 0,
					duration: 200
				}
			).start(() => {
				setIsVisible(false);
			});
		}
	}, [visible]);

	if (layout && isVisible) {
		const x = layout.x - POPOVER_WIDTH + layout.width;
		const y = layout.y + layout.height;

		return (
			<Animated.View style={{
				...styles.popover,
				top: y,
				left: x,
				transform: [{ scale: scaleAnimation }]
			}}>
				{
					actions.map((action, i) => {
						return <PopoverAction action={action} onRequestClose={onRequestClose} key={i} />
					})
				}
			</Animated.View>
		);
	}

	return null;
};

const PopoverAction = ({ action, onRequestClose }: IPopoverActionProps) => {
	const performAction = () => {
		onRequestClose();
		action.onPress();
	}

	return (
		<TouchableOpacity style={styles.action} onPress={performAction}>
			<FontAwesomeIcon icon={action.icon} color="rgba(0, 0, 0, 0.8)" size={16} />
			<Text style={styles.actionText}>{action.text}</Text>
		</TouchableOpacity>
	)
}

export default Popover;