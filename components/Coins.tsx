/** @format */

import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ViewBase,
} from 'react-native';
import React from 'react';

export default function Coins({
	coin,
	setSubModal,
	subModal,
}: any) {
	return (
		<TouchableOpacity onPress={() => setSubModal(!subModal)} className='absolute z-50 top-9 right-6 justify-between flex-row bg-[#DEF5F5] shadow-sm px-1 items-center border rounded-full border-[#d5f5f5]'>
			<Image
				className='h-6 w-6'
				source={require('../public/coin.png')}
			/>
			<Text
				style={styles.textSmall}
				className='text-black font-semibold px-1  text-center'>
				{coin}
			</Text>
			
				<Image
					className='h-5 w-5'
					source={require('../public/add.png')}
				/>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	textSmall: {
		fontSize: 16,
	},
});
