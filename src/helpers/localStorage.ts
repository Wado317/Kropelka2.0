import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_PREFIX = 'kropelka';

async function getItem(key: string, defaultValue: any = null): Promise<any> {
  let value: any;
  try {
    value = await AsyncStorage.getItem(`${STORAGE_PREFIX}${key}`);
  } catch (e) {
    return defaultValue;
  }

  if (typeof value === 'undefined' || value === null) {
    return defaultValue;
  }

  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}

async function setItem(key: string, value: any): Promise<boolean> {
  const item = typeof value === 'string' ? value : JSON.stringify(value);

  try {
    await AsyncStorage.setItem(`${STORAGE_PREFIX}${key}`, item);
    return true;
  } catch (e) {
    return false;
  }
}

export default {
  getItem,
  setItem,
};
