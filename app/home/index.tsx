/** @format */

import {
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	Platform,
	View,
	ImageBackground,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Coins from '../../components/Coins';
import Levels from '../../components/levels';
import NextLevelModal from '../../components/NextLevelModal';
import SubscriptionModal from '../../components/subscriptionModal';
import data from '../../data/game.json';
import { useStoreData } from '../../utils/usedata';
import Iq from '../../components/Iq';
import * as ImageLoader from '../../components/ImageLoader';



export default function index() {
	const [checker, setChecker] = useState<
		{ id: string; letter: string }[]
	>([]);
	const [input, setInput] = useState<[] | any>([]);
	const [answerHint, setAnswerHint] = useState<
		Array<string>
	>([]);
	const [hintIndex, setHintIndex] = useState(0);
	const [game, setGame] = useState<{
		id: any;
		images: any;
		answer: string;
		hint: any;
		letterQuestion: any;
		level: number;
	}>();

	// const str: any = '_';
	const [user, setUser] = useState<{
		level: number;
		coin: number;
	} | null>(null);

	const [modal, setModal] = useState(false);
	const [answer, setAnswer] = useState<any>();
	const [subModal, setSubModal] = useState(false);
   const  img:any = ImageLoader
	const storeData = useStoreData();

	function getLevelData(levels: any, level: number) {
		const levelData = levels.find(
			(data: any) => data.level === level,
		);
		setGame(levelData);
	}

	const increaseCoin = () => {
		if (user) {
			const updatedUser = {
				...user,
				coin: user.coin + 25,
				level: user.level + 1,
			};
			storeData(updatedUser); // Use the storeData function to update and store user data
		}
	};

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

	const handleClick = (i: any) => {
		if (game) {
			if (user) {
				if (!checker.includes(i.letter)) {
					setChecker((prev) => [
						...prev,
						{ id: i.id, letter: i.letter },
					]);
					setInput((prev: any) => [...prev, i.letter]);

					if (hintIndex < game?.hint.length + 1) {
						const hintLetter = game?.hint[hintIndex];
						setAnswerHint((prev: any) => [
							...prev,
							hintLetter,
						]);
						setHintIndex((prev) => prev + 1);
					}
				}
			}
		}
	};

	const handleHint = () => {
		if (game) {
			if (user?.coin && user.coin >= 60) {
				if (hintIndex < game.hint.length + 1) {
					const hintLetter = game.hint[hintIndex];
					setAnswerHint((prev: any) => [
						...prev,
						hintLetter,
					]);
					setInput((prev: any) => [
						...prev,
						hintLetter.letter,
					]);
					setHintIndex((prev) => prev + 1);
					const updatedUser = {
						...user,
						coin: (user.coin -= 60),
					};
					storeData(updatedUser);
					getData();
				}
			}
		}
	};

	const skipLevel = () => {
		if (game) {
			if (user?.coin && user.coin >= 200) {
				setInput(() =>
					game.hint.map((item: any) => item.letter),
				);
				const updatedUser = {
					...user,
					coin: (user.coin -= 200),
				};
				storeData(updatedUser);
				getData();
			}
		}
	};

	useEffect(() => {
		getData();
		if (user) {
			getLevelData(data, user?.level);
			// setAnswer(data)
		}
	
	}, [user?.level]);

	useEffect(() => {
		// When the checker array length matches the answer length, check if it matches the answer
		if (game) {
			setAnswer(game);
			if (user) {
				if (
					checker.length === game.answer.length ||
					input.length === game.answer.length
				) {
					const checkerLetters = input
						.map((item: any) => item)
						.join('');
					if (checkerLetters === game.answer) {
						increaseCoin();
						setModal(!modal);
						getData();
						// getLevelData(data, user?.level + 1);

						// You can also add a delay if needed before showing the next level
						setTimeout(() => {
							getLevelData(data, user?.level + 1);
							// 	// You may also want to clear the answerHint and hintIndex states here
							setAnswerHint([]);
							setHintIndex(0);
						}, 4000); // 200
					}
				}
			}
		}
	}, [checker, input]);

	const nextStage = () => {
		setChecker([]);
		setInput([]);
		// You may also want to clear the answerHint and hintIndex states here
		setAnswerHint([]);
		setHintIndex(0);
	};




	

	return (
		<ImageBackground
			source={require('../../assets/images/home-bg-2.png')}
			resizeMode='cover'
			// style={styles.image}
			className='flex-1'>
			<SafeAreaView className='relative flex-1 justify-center  items-center p-1'>
				<Iq iq='33' />
				<Coins
					coin={user?.coin}
					setSubModal={setSubModal}
					subModal={subModal}
				/>
				<Levels
					level={user?.level}
					size={20}
					boxSize={50}
					topSize={40}
				/>
				<View className='h-full justify-center items-center '>
					<View className={`flex-row justify-center px-5`}>
						<View className='w-3/6 border-[6px] border-white/70 rounded-md mr-2 justify-center items-center'>
							<Image
								style={styles.image}
								className=' rounded-md object-contain bg-cover'
								source={img[game?.images[0]]}
							/>
						</View>
						<View className='w-3/6 border-[6px] border-white/70 rounded-md justify-center items-center'>
							<Image
								style={styles.image}
								className=' rounded-md object-cover'
								// source={game?.images[1]}
								source={img[game?.images[1]]}
							/>
						</View>
					</View>
					<View className='flex-row mt-4 px-5 justify-center'>
						<View className='w-3/6 border-[6px] border-white/70 rounded-md mr-2 justify-center items-center'>
							<Image
								style={styles.image}
								className=' rounded-md object-cover'
								source={img[game?.images[2]]}
							/>
						</View>
						<View className='w-3/6 border-[6px] border-white/70 rounded-md justify-center items-center'>
							<Image
								style={styles.image}
								className=' rounded-md object-cover'
								source={img[game?.images[3]]}
							/>
						</View>
					</View>
					<View className='flex-row gap-3 mt-5 py-4 justify-center'>
						{Array(game?.answer.length)
							.fill('')
							.map((_, indx) => (
								<TouchableOpacity
									onPress={() => {
										const newChecker = [...checker];
										const newInput = [...input];
										newChecker.splice(indx, 1);
										newInput.splice(indx, 1);
										setChecker(newChecker);
										setInput(newInput);
									}}
									key={indx}
									style={styles.btnstyle}
									className=' h-10 w-10 my-16 rounded-lg border-[#D6D6E7] items-center justify-center border-2 shadow-2xl'>
									<Text
										className='font-bold '
										style={styles.text}>
										{input[indx]}
									</Text>
								</TouchableOpacity>
							))}
					</View>
					<View className=' flex-row absolute bottom-0 justify-center items-center  px-6'>
						<View className='justify-center w-11/12 flex-row items-center flex-wrap'>
							{game?.letterQuestion.map(
								(i: any, indx: number) => (
									<TouchableOpacity
										onPress={() => handleClick(i)}
										disabled={checker.some(
											(item) =>
												item.id === i.id ||
												checker.length >=
													game.answer.length,
										)}
										className={`${
											checker.some(
												(item) => item.id === i.id,
											)
												? 'bg-[#D6D6E7]'
												: ''
										}  rounded-lg items-center mr-3 mb-3 border-[#D6D6E7] justify-center border-2 border-t-0 border-r-0 shadow-sm`}
										key={indx}
										style={styles.btns}>
										<Text
											className={`${
												checker.some(
													(item) => item.id === i.id,
												)
													? 'text-[#FCFCFD]'
													: ''
											}  font-bold`}
											style={styles.text}>
											{i.letter}
										</Text>
									</TouchableOpacity>
								),
							)}
						</View>
						<View className={` gap-3 w-[15%] `}>
							<TouchableOpacity
								onPress={() => handleHint()}
								// disabled={
								// 	 game.answer.length <= answerHint.length
								// }
								style={styles.btn}
								className='bg-[#0FA958] border border-[#03a243] p-2 rounded-lg items-center justify-center'>
								<Image
									className='object-cover h-6 w-6'
									source={require('../../public/bulb.png')}
								/>
								<View className='flex-row items-center justify-center'>
									<Text
										style={styles.xs}
										className=' text-white mt-1 font-bold'>
										60
									</Text>
									<Image
										className='object-cover mt-1 h-2 w-2'
										source={require('../../public/coin.png')}
									/>
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => skipLevel()}
								style={styles.btn}
								className='bg-[#0FA958]   border border-[#03a243] p-2 rounded-lg items-center justify-center'>
								<Image
									className=' object-cover h-5 w-5 '
									source={require('../../public/skip.png')}
								/>
								<View className='flex-row items-center justify-center'>
									<Text
										style={styles.xs}
										className=' text-white mt-1 font-bold'>
										200
									</Text>
									<Image
										className='object-cover mt-1 h-2 w-2'
										source={require('../../public/coin.png')}
									/>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				{modal && (
					<NextLevelModal
						answer={answer}
						setModal={setModal}
						modal={modal}
						nextStage={nextStage}
					/>
				)}
				<TouchableOpacity
					onPress={() =>
						console.log('hello')
					}></TouchableOpacity>
				<SubscriptionModal
					subModal={subModal}
					setSubModal={setSubModal}
				/>
			</SafeAreaView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	image: {
		height: 'auto', // Responsive height
		width: '100%', // 50% of the parent container's width
		aspectRatio: 1, // Maintain image aspect ratio
		resizeMode: 'cover', // Cover the container while maintaining aspect ratio
	},

	column: {
		width: '12.66%', // 6 columns (100% / 6)
		height: 50, // Set your desired height
		alignItems: 'center',
		justifyContent: 'center',
	},
	btn: {
		height: 55,
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowColor: '#2b7d4c',
		shadowOpacity: 15,
		shadowRadius: 0,
	},
	text: {
		fontSize: 26,
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},
	xs: {
		fontSize: 10,
	},
	btns: {
		alignItems: 'center',
		backgroundColor: '#FCFCFD',
		fontSize: 26,
		width: '12.66%', // 6 columns (100% / 6)
		height: 60,
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowColor: '#4a4a4a',
		shadowOpacity: 1,
		shadowRadius: 0,
	},
	btnstyle: {
		alignItems: 'center',
		backgroundColor: '#FCFCFD',
		fontSize: 26,
		width: '12.66%', // 6 columns (100% / 6)
		height: 60,
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowColor: '#249BB2',
		shadowOpacity: 0.5,
		shadowRadius: 5,
	},
});
