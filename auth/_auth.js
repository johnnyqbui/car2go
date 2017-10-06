import { AsyncStorage } from "react-native";

export const USER_KEY = "auth-key";

export const onLogIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onLogOut = () => AsyncStorage.removeItem(USER_KEY);

export const isLoggedIn = () => {
  return AsyncStorage.getItem(USER_KEY)
    .then(res => res !== null ? true : false)
    .catch(err => reject(err));
};