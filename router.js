import React from "react";
import { Platform, StatusBar } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import { FontAwesome, MaterialIcons } from "react-native-vector-icons";

import Login from "./components/Login";
import DashBoard from "./components/DashBoard";
import MapDetail from "./components/MapDetail";
import Earnings from "./components/Earnings";
import Info from "./components/Info";
import { white, cyan } from './utils/colors'

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

// Place all routes for different screens
export const LoggedOut = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Log In",
      headerStyle
    }
  }
});

export const LoggedIn = TabNavigator({
  MapDetail: {
    screen: MapDetail,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => 
        <FontAwesome name="home" size={30} color={tintColor} />
    }
  },
  DashBoard: {
    screen: DashBoard,
    navigationOptions: {
      tabBarLabel: "DashBoard",
      tabBarIcon: ({ tintColor }) => 
        <FontAwesome name="dashboard" size={30} color={tintColor} />
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
  Info: {
    screen: Info,
    navigationOptions: {
      tabBarLabel: "Info",
      tabBarIcon: ({ tintColor }) => 
        <FontAwesome name="exclamation-circle" size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions: {
    header: null,
  },
  tabBarPosition: 'bottom',
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: cyan,
    style: {
      height: 56,
      backgroundColor: 'white',
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
  }
});

export const createRootNavigator = (loggedIn) => {
  return StackNavigator(
    {
      LoggedIn: {
        screen: LoggedIn,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      LoggedOut: {
        screen: LoggedOut,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: "none",
      mode: "modal",
      initialRouteName: loggedIn ? "LoggedIn" : "LoggedOut"
    }
  );
};