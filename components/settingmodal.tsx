/** @format */

import {
	Image,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useState } from 'react';

export default function SettingModal({
	setSettingModal,
	settingModal,
}: any) {
	const [isChecked, setIsChecked] = useState(false);

	const toggleSwitch = () => {
		setIsChecked(!isChecked);
	};

	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={settingModal}
			onRequestClose={() => {
				setSettingModal(!settingModal);
			}}>
			<View className='flex-1 relative bg-[#00000039] justify-end items-center'>
				<View className='bg-[#E4EFEF] w-full h-3/6 rounded-xl  p-5'>
					<TouchableOpacity
						onPress={() => setSettingModal(!settingModal)}
						className='absolute right-5 top-3 z-50'>
						<Image
							className='h-7 w-7'
							source={require('../public/close.png')}
						/>
						{/* <Text>close</Text> */}
					</TouchableOpacity>

					<Text className='text-center mb-5 font-semibold'>
						SETTINGS
					</Text>
					<View className='bg-white mb-5 w-full rounded-xl '>
						<View className='border-b border-gray-200 flex-row justify-between p-4 mx-1 items-center'>
							<View className='flex-row gap-2 items-center'>
								<Image
									className='h-5 w-5'
									source={require('../public/world.png')}
								/>
								<Text>Language</Text>
							</View>
							<View className='mr-5'>
								<Text className='text-gray-500'>
									English
								</Text>
							</View>
						</View>
						<TouchableOpacity
							onPress={toggleSwitch}
							className=' border-b border-gray-200 flex-row justify-between p-4 mx-1 items-center'>
							<View className='flex-row gap-2 items-center'>
								<Image
									className='h-5 w-5'
									source={require('../public/sound.png')}
								/>
								<Text>Sounds</Text>
							</View>
							<View className=''>
								<View className='pr-5'>
									<View>
										{isChecked ? (
											<Text className='text-gray-500'>On</Text>
										) : null}
									</View>
									<View>
										{isChecked ? null : (
											<Text className='text-gray-500'>Off</Text>
										)}
									</View>
								</View>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={toggleSwitch}
							className=' flex-row justify-between p-4 mx-1 items-center'>
							<View className='flex-row gap-2 items-center'>
								<Image
									className='h-5 w-5'
									source={require('../public/sound.png')}
								/>
								<Text>Music</Text>
							</View>
							<View className=''>
								<View className='pr-5'>
									<View>
										{isChecked ? (
											<Text className='text-gray-500'>On</Text>
										) : null}
									</View>
									<View>
										{isChecked ? null : (
											<Text className='text-gray-500'>Off</Text>
										)}
									</View>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					<View className='bg-white mb-5 w-full rounded-xl '>
						<View className='border-b border-gray-200 p-4 mx-1'>
							<View className='flex-row gap-2 items-center'>
								<Image
									className='h-5 w-5'
									source={require('../public/rate.png')}
								/>
								<Text>Rate the App</Text>
							</View>
						</View>
						<View className=' flex-row justify-between p-4 mx-1 items-center'>
							<View className='flex-row gap-2 items-center'>
								<Image
									className='h-5 w-5'
									source={require('../public/file.png')}
								/>
								<Text>Privacy Policy</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({});
