import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const useStoreData = () => {

  const storeData = async (data: {
    level: number;
    coin: number;
  }) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('user', jsonValue);
    } catch (e) {
      console.error(e, 'error');
    }
  };

  return storeData;
};
