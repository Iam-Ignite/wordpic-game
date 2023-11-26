
import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import 'expo-dev-client';


function RootLayoutNav() {

	return (
		<Stack initialRouteName='index'>
			<Stack.Screen
				name='index'
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='home'
				options={{ headerShown: false }}
			/>
		</Stack>
	);
}

export default RootLayoutNav;
