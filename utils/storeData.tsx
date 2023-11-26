import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStore = (key: string, initialValue: any) => {
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    // Load data from AsyncStorage when the component mounts
    const loadData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue !== null) {
          setData(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error('Error loading data from AsyncStorage:', e);
      }
    };

    loadData();
  }, [key]);

  const storeData = async (newData: any) => {
    try {
      const jsonValue = JSON.stringify(newData);
      await AsyncStorage.setItem(key, jsonValue);
      setData(newData); // Update the local state with the new data
    } catch (e) {
      console.error('Error storing data in AsyncStorage:', e);
    }
  };

  return [data, storeData];
};
