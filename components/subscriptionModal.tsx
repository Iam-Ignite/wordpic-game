/** @format */

import {
	Image,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
	RewardedAd,
	RewardedAdEventType,
	TestIds,
} from 'react-native-google-mobile-ads';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStoreData } from '../utils/usedata';

const adUnitId = 'ca-app-pub-4076168059895058/6159886146';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
	requestNonPersonalizedAdsOnly: true,
	keywords: ['fashion', 'clothing'],
});

export default function SubscriptionModal({
	setSubModal,
	subModal,
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
	}, [user]);

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
						coin: (user.coin += 30),
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
	}, [user]);

	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={subModal}
			onRequestClose={() => {
				setSubModal(!subModal);
			}}>
			<View className='flex-1 relative bg-[#00000039] justify-end items-center'>
				<View className='bg-[#E4EFEF] w-full h-3/6 rounded-xl  p-5'>
					<TouchableOpacity
						onPress={() => setSubModal(!subModal)}
						className='absolute right-5 top-3 z-50'>
						<Image
							className='h-7 w-7'
							source={require('../public/close.png')}
						/>
						{/* <Text>close</Text> */}
					</TouchableOpacity>

					<Text className='text-center mb-5 font-semibold'>
						Get more coins
					</Text>
					<View className='bg-white mb-5 w-full rounded-xl '>
						<TouchableOpacity
							// disabled={loaded}
							onPress={() => {
								if (loaded) {
									rewarded.show();
									// 
								}
							}}
							className='border-b border-gray-200 flex-row justify-between p-4 mx-1 items-center'>
							<View className='flex-row gap-2 items-center'>
								<Image
									className='h-5 w-5'
									source={require('../public/redplay.png')}
								/>
								<Text className='font-bold ml-1'>
									+30 coins{' '}
								</Text>
							</View>
							<View className='mr-5'>
								<Text className='text-gray-500'>
									{loaded ? 'Watch Ads' : 'No ads to watch'}
								</Text>
							</View>
						</TouchableOpacity>
					</View>
					<View className='bg-white mb-5 w-full rounded-xl '>
						<View className='border-b border-gray-200 flex-row justify-between p-4 mx-1 items-center'>
							<View className='flex-row gap-2 items-center'>
								<Image
									className='h-5 w-5'
									source={require('../public/coin.png')}
								/>
								<Text className='font-bold ml-1'>
									+1500 coins{' '}
								</Text>
							</View>
							<View className='mr-5'>
								<Text className='text-gray-500'>$1.99</Text>
							</View>
						</View>
						<View className='border-b border-gray-200 flex-row justify-between p-4 mx-1 items-center'>
							<View className='flex-row gap-2 items-center'>
								<Image
									className='h-5 w-5'
									source={require('../public/coin.png')}
								/>
								<Text className='font-bold ml-1'>
									+3000 coins{' '}
								</Text>
							</View>
							<View className='mr-5'>
								<Text className='text-gray-500'>$3.99</Text>
							</View>
						</View>
						<View className='border-b border-gray-200 flex-row justify-between p-4 mx-1 items-center'>
							<View className='flex-row gap-2 items-center'>
								<Image
									className='h-5 w-5'
									source={require('../public/coin.png')}
								/>
								<Text className='font-bold ml-1'>
									+6000 coins{' '}
								</Text>
							</View>
							<View className='mr-5'>
								<Text className='text-gray-500'>$6.99</Text>
							</View>
						</View>
						<View className='border-b border-gray-200 flex-row justify-between p-4 mx-1 items-center'>
							<View className='flex-row gap-2 items-center'>
								<Image
									className='h-5 w-5'
									source={require('../public/coin.png')}
								/>
								<Text className='font-bold ml-1'>
									+10000 coins{' '}
								</Text>
							</View>
							<View className='mr-5'>
								<Text className='text-gray-500'>
									$11.99
								</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({});
