import React, { useState } from 'react';
import { Animated } from 'react-native';
import { useLocation } from 'react-router-native';

const RouteTransition = (props) => {
	const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0));
	const [translateAnimation, setTranslateAnimation] = useState(new Animated.Value(40));
	const [animationFinished, setAnimationFinished] = useState(false);
	const location = useLocation();

	React.useEffect(() => {
		setAnimationFinished(false);
		
		Animated.parallel([
			Animated.timing(
				fadeAnimation,
				{
					toValue: 1,
					duration: 400
				}
			),
			Animated.timing(
				translateAnimation,
				{
					toValue: 0,
					duration: 400
				}
			)
		]).start(() => {
			setFadeAnimation(new Animated.Value(0));
			setTranslateAnimation(new Animated.Value(50));
			setAnimationFinished(true);
		});
	}, [location.pathname]);

	return (
		<Animated.View style={{
			opacity: animationFinished ? 1 : fadeAnimation,
			transform: [{ translateX: animationFinished ? 0 : translateAnimation }],
			backgroundColor: props.backgroundColor,
			flex: 1
		}}>
			{props.children}
		</Animated.View>
	)
}

export default RouteTransition;