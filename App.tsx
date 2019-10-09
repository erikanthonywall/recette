import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { NativeRouter, Route, Switch, BackButton } from 'react-router-native';

import Header from './src/components/Header/Header';
import RouteTransition from './src/components/RouteTransition/RouteTransition';

import RecipeList from './src/components/RecipeList/RecipeList';

const styles = StyleSheet.create({
	mainContent: {
		flexDirection: 'column',
		flex: 1,
		backgroundColor: '#fff'
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

const App = () => {
	const [icon, setIcon] = useState('shopping');

	const onPressHeaderButton = () => {
		alert('hello');
	}

	return (
		<>
			<NativeRouter>
				<BackButton />
				<StatusBar barStyle="light-content" />
				<View style={styles.mainContent}>
					<Header />
					
					<Switch>
						<Route exact path="/" render={() => {
							return <RouteTransition backgroundColor="white">
								<RecipeList />
							</RouteTransition>
						}} />

						<Route exact path="/shopping" render={() => {
							return <RouteTransition backgroundColor="white">
								<Text>Shopping</Text>
							</RouteTransition>
						}} />
					</Switch>
				</View>
			</NativeRouter>
		</>
	);
}

export default App;
