/** @format */

import {
	Image,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import {
	RewardedAd,
	RewardedAdEventType,
	TestIds,
} from 'react-native-google-mobile-ads';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStoreData } from '../utils/usedata';
import { useEffect, useState } from 'react';

const adUnitId = __DEV__
	? TestIds.REWARDED
	: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
	requestNonPersonalizedAdsOnly: true,
	keywords: ['fashion', 'clothing'],
});
export default function NextLevelModal({
	answer,
	nextStage,
	setModal,
	modal,
}: any) {
	const [loaded, setLoaded] = useState(false);

	const storeData = useStoreData(); // Use the custom hook to get the storeData function
	const [user, setUser] = useState<{
		level: number;
		coin: number;
	} | null>(null);

	const getData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem('user');
			if (jsonValue !== null) {
				const data = JSON.parse(jsonValue) as {
					level: number;
					coin: number;
				};
				setUser(data);
			}
		} catch (e) {
			console.log(e, 'error fetching');
		}
	};

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		const unsubscribeLoaded = rewarded.addAdEventListener(
			RewardedAdEventType.LOADED,
			() => {
				setLoaded(true);
			},
		);
		const unsubscribeEarned = rewarded.addAdEventListener(
			RewardedAdEventType.EARNED_REWARD,
			() => {
				console.log('User earned reward of ', user);
				if (user) {
					const updatedUser = {
						...user,
						coin: (user.coin += 25),
					};
					console.log(updatedUser);
					getData();
					storeData(updatedUser);
				}
			},
		);

		// Start loading the rewarded ad straight away
		rewarded.load();

		// Unsubscribe from events on unmount
		return () => {
			unsubscribeLoaded();
			unsubscribeEarned();
		};
	}, []);

	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={true}
			onRequestClose={() => {
				setModal(!modal);
			}}>
			<View className='backdrop-blur-3xl relative bg-[#848c93b4]/80 flex-1 pt-28 items-center'>
				<Text className='text-white text-3xl font-bold mb-16'>
					Excellent
				</Text>
				<View className='flex-row relative'>
					<Image
						style={styles.image}
						source={require('../assets/images/solar.png')}
					/>
					<Image
						style={styles.image}
						className='-mt-8 '
						source={require('../assets/images/solar.png')}
					/>
					<Image
						style={styles.image}
						source={require('../assets/images/solar.png')}
					/>
				</View>
					<View className='flex-row relative'>
					{/* <Image
						style={styles.image}
						source={require('../assets/images/solar.png')}
					/> */}
					<Image
						style={styles.image}
						className='-mt-8 '
						source={require('../assets/images/solar.png')}
					/>
					{/* <Image
						style={styles.image}
						source={require('../assets/images/solar.png')}
					/> */}
				</View>
				<Text className='text-white font-semibold text-3xl my-5'>
					Right Word:
				</Text>
				<View className='flex-row '>
					{answer.hint.map((i: any) => (
						<View
							style={styles.btnstyle}
							key={i.id}
							className='rounded-lg px-3 py-2 bg-[#D6D6E7]  mr-3  mb-3 border-[#D6D6E7]  border-2 border-t-0 border-r-0 shadow-sm'>
							<Text
								style={styles.text}
								className='text- font-bold'>
								{i.letter}
							</Text>
						</View>
					))}
				</View>
				<View className=' justify-between flex-row bg-[#DEF5F5]/30 shadow-sm px-1 pr-4 py-1 mt-4 items-center rounded-full '>
					<Image
						className='h-8 w-8'
						source={require('../public/coin.png')}
					/>
					<Text className='text-white font-bold px-1 text-center'>
						+25
					</Text>
				</View>

				<View className='mt-28 items-center justify-center w-2/5'>
					<TouchableOpacity
						onPress={() => {
							nextStage();
							setModal(!modal);
						}}
						className='bg-[#249BB2] shadow-sm px-6 py-3 w-full rounded-md '>
						<Text className='text-white font-bold text-center'>
							Continue
						</Text>
					</TouchableOpacity>
					{loaded && (
						<TouchableOpacity
							onPress={() => rewarded.show()}
							className='bg-[#03A243] flex-row justify-between items-center transition-all px-6 py-3 rounded-lg w-full mt-4 shadow-2xl'>
							<Image
								className='h-4 w-4'
								source={require('../public/playbtn.png')}
							/>
							<Text className='text-white font-bold text-center'>
								Double x2
							</Text>
							<Image
								className='h-4 w-4'
								source={require('../public/coin.png')}
							/>
						</TouchableOpacity>
					)}
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	image: {
		height: 'auto', // Responsive height
		width: '25%', // 50% of the parent container's width
		aspectRatio: 1, // Maintain image aspect ratio
		resizeMode: 'cover', // Cover the container while maintaining aspect ratio
	},
	text: {
		fontSize: 26,
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},
	btnstyle: {
		alignItems: 'center',
		backgroundColor: '#FCFCFD',
		fontSize: 26,
	},
});
