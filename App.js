import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, TouchableHighlight } from 'react-native';
import { AppLoading, Location, Permissions } from 'expo'
import { FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import MapView from 'react-native-maps'
import * as Animatable from 'react-native-animatable';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  )
}

const DashBoard = () => {
  return (
    <View style={styles.container}>
      <Text>DashBoard</Text>
    </View>
  )
}

const Earnings = () => {
  return (
    <View style={styles.container}>
      <Text>Earnings</Text>
    </View>
  )
}

const Account = () => {
  return (
    <View style={styles.container}>
      <Text>Account</Text>
    </View>
  )
}

const Tabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: () => <FontAwesome name="home" size={30} color="black" />
    }
  },
  DashBoard: {
    screen: DashBoard,
    navigationOptions: {
      tabBarIcon: () => <FontAwesome name="dashboard" size={30} color="black" />
    }
  },
  Earnings: {
    screen: Earnings,
    navigationOptions: {
      tabBarIcon: () => <MaterialIcons name="attach-money" size={30} color="black" />
    }
  },
  Account: {
    screen: Account,
    navigationOptions: {
      tabBarIcon: () => <MaterialCommunityIcons name="account" size={30} color="black" />
    }
  }
})

export default class App extends Component {
  state = {
    status: null,
    currentLocation: null,
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    ready: false
  }

  getLocation = () => {
    Permissions.getAsync(Permissions.LOCATION)
    .then(({ status }) => {
      if (status === 'granted') {
        this.setLocation()
      }
      this.setState({
        status
      })
    })
    .catch((error) => {
      console.warn('Error obtaining Location Permission: ', error)
      this.setState({ status: 'denied' })
    })
  }

  setLocation = () => {
    Location.getCurrentPositionAsync({}).then((currentLocation) => {
      this.setState({
        currentLocation: currentLocation.coords,
        region: {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      })
    })
  }

  render() {
    // For data loading
    // const { ready } = this.state;
    // if (ready === false) {
    //   return <AppLoading/>
    // }

    return (
      <View>
        <MapView
          style={styles.map}
          region={this.state.region}
          showsUserLocation={true}
          onPress={this.closeInfoBox}
        />

        <TouchableHighlight
          ref="location"
          style={[styles.button, styles.getLocationButton]}
          onPress={this.getLocation}
          underlayColor='grey'>
          <MaterialIcons name="my-location" size={30} color={"black"}/>
        </TouchableHighlight>

        <View style={styles.container}>
          <Tabs />
        </View>
      </View>
    );
  }
}

/*<Animatable.View
  ref="info"
  style={styles.infoBox}>
  <Text style={styles.infoBoxText}>
    More Info here.
  </Text>
</Animatable.View>
<View
  style={styles.mainContainer}>
  <View
    style={styles.box}
    onPress={this.openInfoBox}>
  </View>
  <View
    style={styles.box}>
  </View>
  <View
    style={styles.box}>
  </View>
  <View
    style={styles.box}>
  </View>
</View>
*/

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    width: width,
    justifyContent: 'space-around',
    bottom: 0,
    backgroundColor: 'rgb(5, 10, 48)'
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    margin: 10
  },
	logo: {
		flex: 1,
		alignItems: 'center',
		marginLeft: 50
	},
  infoBox: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: '#fff',
    height: 200,
    width: width,
    bottom: 0,
  },
  infoBoxText: {
    margin: 10
  },
  button: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
  },
  getLocationButton: {
    zIndex: 3,
    bottom: 50,
    right: 0,
    margin: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  map: {
    height: height,
    width: width
  },
});
