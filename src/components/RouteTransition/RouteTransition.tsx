import React, { useState } from 'react';
import { Animated } from 'react-native';
import { useLocation } from 'react-router-native';

const RouteTransition = (props) => {
	const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0));
	const [translateAnimation, setTranslateAnimation] = useState(new Animated.Value(50));
	const [doneAnimating, setDoneAnimating] = useState(false);
	const location = useLocation();

	console.log('here');

	React.useEffect(() => {
		setDoneAnimating(false);
		
		Animated.parallel([
			Animated.timing(
				fadeAnimation,
				{
					toValue: 1,
					duration: 600
				}
			),
			Animated.timing(
				translateAnimation,
				{
					toValue: 0,
					duration: 600
				}
			)
		]).start(() => {
			setDoneAnimating(true);
			setFadeAnimation(new Animated.Value(0));
			setTranslateAnimation(new Animated.Value(50));
		});
	}, [location.pathname]);

	return (
		<Animated.View style={{
			opacity: doneAnimating ? 1 : fadeAnimation,
			transform: [{ translateX: translateAnimation }],
			backgroundColor: props.backgroundColor,
			flex: 1
		}}>
			{props.children}
		</Animated.View>
	)
}

export default RouteTransition;