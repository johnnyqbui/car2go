import React from "react";
import { Dimensions, Platform, StatusBar } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import { FontAwesome, MaterialIcons } from "react-native-vector-icons";

import LoadingScreen from "../screens/LoadingScreen";
import Login from "../screens/Login";
import Map from "../screens/Map";
import Earnings from "../screens/Earnings";
import Mission from "../screens/Mission";
import { darkBlue, blue, nonActiveTint } from '../utils/colors'

const { width } = Dimensions.get('window');

// Place all routes for different screens
export const LoggedIn = TabNavigator({
  Map: {
    screen: Map,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => 
        <MaterialIcons name="home" size={30} color={tintColor} />
    }
  },
  Earnings: {
    screen: Earnings,
    navigationOptions: {
      tabBarLabel: "Earnings",
      tabBarIcon: ({ tintColor }) => 
        <FontAwesome name="flag" size={30} color={tintColor} />
    }
  },
  Mission: {
    screen: Mission,
    navigationOptions: {
      tabBarLabel: "Mission",
      tabBarIcon: ({ tintColor }) => 
        <MaterialIcons name="directions-car" size={30} color={tintColor} />
    }
  }
}, {
  animationEnabled: false,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: nonActiveTint,
    activeBackgroundColor : blue,
    showIcon: true,
    showLabel: true, 
    labelStyle: {
      fontSize: 12,
    },
    indicatorStyle: {
      opacity: 0
    },
    style: {
      height: 50,
      backgroundColor: darkBlue,
      // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      // position: 'absolute',
      // width: width,
      // bottom: 0,
    }
  }
});

// Default screen is login
export const createRootNavigator = (loggedIn) => {
  return StackNavigator({
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
    })
};