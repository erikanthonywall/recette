import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { NativeRouter, Route, Switch } from 'react-router-native';

import Header from './src/components/Header/Header';
import RouteTransition from './src/components/RouteTransition/RouteTransition';

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
				<StatusBar barStyle="light-content" />
				<View style={styles.mainContent}>
					<Header />
					
					<Switch>
						<Route exact path="/" render={() => {
							console.log('recipes');
							return <RouteTransition backgroundColor="blue">
								<Text>Recipes</Text>
							</RouteTransition>
						}} />

						<Route exact path="/shopping" render={() => {
							console.log('shopping');
							return <RouteTransition backgroundColor="red">
								<Text>Shopping</Text>
							</RouteTransition>
						}} />
					</Switch>
				</View>
			</NativeRouter>
		</>
	);
}

// const App = () => {
//   const usingHermes = typeof HermesInternal === 'object' && HermesInternal !== null;
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {!usingHermes ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

export default App;
