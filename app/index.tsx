/** @format */

import {
	Button,
	Image,
	ImageBackground,
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import SettingModal from '../components/settingmodal';
import { router } from 'expo-router';
import Coins from '../components/Coins';
import Levels from '../components/levels';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SubscriptionModal from '../components/subscriptionModal';
import * as Font from 'expo-font';
import Iq from '../components/Iq';
import {
	RewardedInterstitialAd,
	RewardedAdEventType,
	BannerAd,
	BannerAdSize,
} from 'react-native-google-mobile-ads';

const rewardedInterstitial =
	RewardedInterstitialAd.createForAdRequest(
		'ca-app-pub-4076168059895058/3608498552',
		{
			requestNonPersonalizedAdsOnly: true,
			keywords: ['fashion', 'clothing'],
		},
	);

export default function index() {
	const [user, setUser] = useState({
		level: 1,
		coin: 0,
	});
	const [settingModal, setSettingModal] = useState(false);
	const [subModal, setSubModal] = useState(false);
	const [sound, setSound] = useState<any>();
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const unsubscribeLoaded =
			rewardedInterstitial.addAdEventListener(
				RewardedAdEventType.LOADED,
				() => {
					setLoaded(true);
				},
			);
		const unsubscribeEarned =
			rewardedInterstitial.addAdEventListener(
				RewardedAdEventType.EARNED_REWARD,
				(reward) => {
					console.log('User earned reward of ', reward);
				},
			);

		// Start loading the rewarded interstitial ad straight away
		rewardedInterstitial.load();

		// Unsubscribe from events on unmount
		return () => {
			unsubscribeLoaded();
			unsubscribeEarned();
		};
	}, []);

	// // No advert ready to show yet
	if (!loaded) {
		return (
			<ImageBackground
				source={require('../assets/images/iPhone.png')}
				resizeMode='cover'
				style={styles.image}>
				<SafeAreaView className='flex-1 relative justify-center items-center'>
					<Coins
						coin={user.coin}
						setSubModal={setSubModal}
						subModal={subModal}
					/>
					<Levels
						level={user.level}
						size={40}
						boxSize={100}
						topSize={200}
					/>
					<View className='p-5 bg-white/70 w-9/12 items-center justify-center py-6 h-auto rounded-md shadow-sm px-5'>
						<TouchableOpacity
							className='w-full h-16 mb-3 justify-center rounded-md items-center'
							onPress={() => router.push('/home')}>
							<ImageBackground
								source={require('../assets/images/btn.png')}
								resizeMode='cover'
								className='h-16 overflow-hidden w-full  justify-center rounded-lg items-center '>
								<Text
									style={styles.textSize}
									className='text-white font-semibold mb-2 text-center'>
									Play
								</Text>
							</ImageBackground>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => setSettingModal(!settingModal)}
							className='bg-[#249BB2] shadow-sm p-3  px-4 w-11/12 rounded-md mx-3'>
							<Text
								style={styles.textSmall}
								className='text-white font-semibold text-center'>
								SETTINGS
							</Text>
						</TouchableOpacity>
						{/* <Button title='Play Sound' /> */}
					</View>
					<Button
						title='Show Rewarded Interstitial Ad'
						onPress={() => {
							rewardedInterstitial.show();
						}}
					/>
					<BannerAd
						unitId='ca-app-pub-4076168059895058/5491645618'
						size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
						requestOptions={{
							requestNonPersonalizedAdsOnly: true,
						}}
					/>
					<SettingModal
						setSettingModal={setSettingModal}
						settingModal={settingModal}
					/>
					<SubscriptionModal
						subModal={subModal}
						setSubModal={setSubModal}
					/>
				</SafeAreaView>
			</ImageBackground>
		);
	}

	// setSettingModal(true)
	// var sub = false;
	// sub =true

	React.useEffect(() => {
		return sound
			? () => {
					console.log('Unloading Sound');
					sound.unloadAsync();
			  }
			: undefined;
	}, [sound]);

	const loadCustomFont = async () => {
		await Font.loadAsync({
			bungee: require('../assets/fonts/BlackOpsOne-Regular.ttf'),
		});
	};

	useEffect(() => {
		loadCustomFont();
	}, [user]);

	const getData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem('user');
			// await AsyncStorage.removeItem('user');
			const user = {
				level: 1,
				coin: 400,
			};

			if (jsonValue === null) {
				const jsonValue = JSON.stringify(user);
				await AsyncStorage.setItem('user', jsonValue);

				// console.log(jsonValue);
			} else {
				const data = JSON.parse(jsonValue);
				setUser(data);
			}
		} catch (e) {
			console.log(e, 'error fetching');
		}
	};

	useEffect(() => {
		getData();
	}, []);

	// const image = { uri: '../assets/images/iPhone.png' };

	return (
		<ImageBackground
			source={require('../assets/images/iPhone.png')}
			resizeMode='cover'
			style={styles.image}>
			<SafeAreaView className='flex-1 relative justify-center items-center'>
				<Coins
					coin={user.coin}
					setSubModal={setSubModal}
					subModal={subModal}
				/>
				<Levels
					level={user.level}
					size={40}
					boxSize={100}
					topSize={250}
				/>
				<View className='p-5 bg-white/70 w-9/12 items-center justify-center py-6 h-auto rounded-md shadow-sm px-5'>
					<TouchableOpacity
						className='w-full h-16 mb-3 justify-center rounded-md items-center'
						onPress={() => router.push('/home')}>
						<ImageBackground
							source={require('../assets/images/btn.png')}
							resizeMode='cover'
							className='h-16 overflow-hidden w-full  justify-center rounded-lg items-center '>
							<Text
								style={styles.textSize}
								className='text-white font-semibold mb-2 text-center'>
								Play
							</Text>
						</ImageBackground>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setSettingModal(!settingModal)}
						className='bg-[#249BB2] shadow-sm p-3  px-4 w-11/12 rounded-md mx-3'>
						<Text
							style={styles.textSmall}
							className='text-white font-semibold text-center'>
							SETTINGS
						</Text>
					</TouchableOpacity>
					{/* <Button title='Play Sound' /> */}
				</View>
				<Button
					title='Show Rewarded Interstitial Ad'
					onPress={() => {
						rewardedInterstitial.show();
					}}
				/>
				<SettingModal
					setSettingModal={setSettingModal}
					settingModal={settingModal}
				/>
				<SubscriptionModal
					subModal={subModal}
					setSubModal={setSubModal}
				/>
			</SafeAreaView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	textSize: {
		fontSize: 28,
		fontFamily: 'bungee',
		shadowOffset: {
			width: -2,
			height: 2,
		},
		shadowOpacity: 5,
		shadowRadius: 1,
	},
	textSmall: {
		fontFamily: 'bungee',
		fontSize: 16,
	},
	boxShadow: {
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowColor: '#2d8e53',
		// shadowOpacity: 15,
		shadowRadius: 0,
	},
	image: {
		flex: 1,
		justifyContent: 'center',
	},
});
