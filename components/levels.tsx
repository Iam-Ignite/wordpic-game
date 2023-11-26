/** @format */

import React, { useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	ImageBackground,
} from 'react-native';
import * as Font from 'expo-font';


function Levels({ level, size,boxSize, topSize }: any) {
	  const style = styles(size,boxSize, topSize );

	const loadCustomFont = async () => {
		await Font.loadAsync({
			bungee: require('../assets/fonts/BlackOpsOne-Regular.ttf'),
		});
	};
	    
	useEffect(() => {
		loadCustomFont();
	}, [loadCustomFont]);

	return (
		<View style={style.boxTop} className={`w-full justify-center items-center z-20 absolute `}>
			<ImageBackground
				source={require('../assets/images/level.png')}
				resizeMode='cover'
				style={style.boxHieght}
				className={`items-center justify-center `}>
				<Text style={style.text} className='font-bold text-white'>
					{level}
				</Text>
			</ImageBackground>
		</View>
	);
}

const styles = (size: any, boxSize:any, topSize:any) => StyleSheet.create({
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
	text:{
		fontFamily:"bungee",
		fontSize:size || 20,
	},
	boxHieght:{
      height:boxSize || 14,
      width:boxSize || 14,
	},
	boxTop:{
		top:topSize || 12,
	}
});

export default Levels;
