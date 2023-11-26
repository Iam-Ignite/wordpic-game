/** @format */

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

export default function _layout() {
	return (
		<Stack>
			<Stack.Screen
				name='index'
					options={{
					headerShown: !true,
					headerTitle: '',
					headerStyle: {
						backgroundColor: '#fafafa',
					},
					headerTintColor: '#000',
					headerShadowVisible: false,
				}}
			/>
		</Stack>
	);
}
