import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV({
  id: `user-storage`,
});

export const setStorage = (key: string, data: any) => {
  storage.set(key, JSON.stringify(data))
}

export const getStorage = (key: string) => {
  const user = storage.getString(key)
  if (user) {
    const data = JSON.parse(user);
    return data;
  }
  return false
}

export const deleteStorage = (key: string) => {
  storage.delete(key);
}