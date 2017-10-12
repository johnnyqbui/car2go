import React from "react";
import { Platform, StatusBar } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import { FontAwesome, MaterialIcons } from "react-native-vector-icons";

import LoadingScreen from "./components/LoadingScreen";
import Login from "./components/Login";
import DashBoard from "./components/DashBoard";
import Map from "./components/Map";
import Earnings from "./components/Earnings";
import Profile from "./components/Profile";
import { white, cyan } from './utils/colors'

// Place all routes for different screens

export const LoggedIn = TabNavigator({
  Map: {
    screen: Map,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => 
        <FontAwesome name="home" size={30} color={tintColor} />
    }
  },
  Earnings: {
    screen: Earnings,
    navigationOptions: {
      tabBarLabel: "Earnings",
      tabBarIcon: ({ tintColor }) => 
        <MaterialIcons name="attach-money" size={30} color={tintColor} />
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarIcon: ({ tintColor }) => 
        <FontAwesome name="exclamation-circle" size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions: {
    header: null,
  },
  animationEnabled: false,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: cyan,
    style: {
      height: 56,
      backgroundColor: 'white',
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
  }
});

// Default screen is login
export const createRootNavigator = (loggedIn) => {
  return StackNavigator(
    {
      LoggedOut: {
        screen: Login,
        navigationOptions: {
          gesturesEnabled: false,
          header: null
        }
      },
      LoggedIn: {
        screen: LoggedIn,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
    },
    {
      headerMode: "none",
      mode: "modal",
      initialRouteName: loggedIn ? "LoggedIn" : "LoggedOut"
    }
  );
};