import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyValueStorage } from './KeyValueStorage';

export class AsyncStorageAdapter implements KeyValueStorage {
  async getItem<T>(key: string): Promise<T | null> {
    const rawValue = await AsyncStorage.getItem(key);
    if (rawValue === null) {
      return null;
    }
    try {
      return JSON.parse(rawValue) as T;
    } catch {
      return null;
    }
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }

  async removeItem(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }
}