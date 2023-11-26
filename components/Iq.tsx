/** @format */

import React, { useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	ImageBackground,
	TouchableOpacity,
} from 'react-native';
import * as Font from 'expo-font';

function Iq({ iq }: any) {
	const loadCustomFont = async () => {
		await Font.loadAsync({
			bungee: require('../assets/fonts/BlackOpsOne-Regular.ttf'),
		});
	};

	useEffect(() => {
		loadCustomFont();
	}, [loadCustomFont]);

	return (
		<View className='w-full justify-start items-center absolute top-9 left-6 flex-row '>
		<View className='bg-[#BDEBEB] z-40'>
			<Image
				// style={styles.image}
				className=' rounded-md h-10   w-8 object-cover'
				source={require('../assets/images/brain.png')}
			/>
		</View>
			<TouchableOpacity className='justify-between h-auto pl-3 pr-2 mb-1 flex-row bg-[#DEF5F5] shadow-sm -ml-2 items-center border rounded-full border-[#a4f1f1]'>
				<Text
					style={styles.text}
					className='font-semibold text-black'>
					IQ
					{iq}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	innerContainer: {
		backgroundColor: '#DEF5F5',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		padding: 5,
		borderRadius: 50,
		borderColor: '#d5f5f5',
		borderWidth: 1,
	},
	text: {
		// fontFamily: 'bungee',
		fontSize: 16,
	},
});

export default Iq;
