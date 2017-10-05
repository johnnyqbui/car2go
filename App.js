import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { View, StatusBar } from 'react-native';
import { AppLoading, Constants } from 'expo'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import MapDetail from './components/MapDetail';
import DashBoard from './components/DashBoard';
import Earnings from './components/Earnings';
import Account from './components/Account';
import { white, cyan } from './utils/colors'

const C2GStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
const Tabs = TabNavigator({
  MapDetail: {
    screen: MapDetail,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => <FontAwesome name="home" size={30} color={tintColor} />
    }
  },
  DashBoard: {
    screen: DashBoard,
    navigationOptions: {
      tabBarLabel: "DashBoard",
      tabBarIcon: ({ tintColor }) => <FontAwesome name="dashboard" size={30} color={tintColor} />
    }
  },
  Earnings: {
    screen: Earnings,
    navigationOptions: {
      tabBarLabel: "Earnings",
      tabBarIcon: ({ tintColor }) => <MaterialIcons name="attach-money" size={30} color={tintColor} />
    }
  },
  Account: {
    screen: Account,
    navigationOptions: {
      tabBarLabel: "Account",
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="account" size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions: {
    header: null,
  },
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: cyan,
    style: {
      height: 56,
      backgroundColor: 'white',
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  EntryDetail: {
    screen: MapDetail,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: cyan
      }
    }
  }
})

export default class App extends Component {
  render() {
    // For data loading
    // const { ready } = this.state;
    // if (ready === false) {
    //   return <AppLoading/>
    // }

    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <C2GStatusBar backgroundColor='white' barStyle="default" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}