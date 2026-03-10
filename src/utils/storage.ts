import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeString = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('storage error', e);
  }
};

export const storeObject = async (key: string, value: Object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('storage error', e);
  }
};

export const getStoredString = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (!value) {
      return;
    }

    return value;
  } catch (e) {
    console.log('storage error', e);
  }
};

export const getStoredObject = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);

    if (!jsonValue) {
      return;
    }

    return JSON.parse(jsonValue);
  } catch (e) {
    console.log('storage error', e);
  }
};
