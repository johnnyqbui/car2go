import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, TouchableHighlight } from 'react-native';
import { Location, Permissions } from 'expo'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import MapView from 'react-native-maps'
import * as Animatable from 'react-native-animatable';

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
        bottom: 0
      })
    })
  }

  openInfoBox = () => {
    this.refs.info.transitionTo({bottom: 0})
  }

  closeInfoBox = () => {
    this.refs.info.transitionTo({bottom: -200})
  }

  render() {
    const { bottom } = this.state;
    return (
      <View>
        <MapView
          style={styles.map}
          region={this.state.region}
          showsUserLocation={true}
          onPress={this.closeInfoBox}
        />
        <TouchableHighlight
          style={[styles.button, styles.menuButton]}
          onPress={this.openMenu}
          underlayColor='cyan'>
          <Ionicons name="ios-menu" size={40}/>
        </TouchableHighlight>

        <TouchableHighlight
          ref="button"
          style={[styles.button, styles.moreInfoButton]}
          onPress={this.openInfoBox}
          underlayColor='cyan'>
          <Text>
            More
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          ref="location"
          style={[styles.button, styles.getLocationButton]}
          onPress={this.getLocation}
          underlayColor='cyan'>
          <FontAwesome name="location-arrow" size={40} color={"#07a8ff"}/>
        </TouchableHighlight>

        <Animatable.View
          ref="info"
          style={styles.infoBox}>
          <Text style={styles.infoBoxText}>
            More Info here.
          </Text>
        </Animatable.View>
      </View>
    );
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
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
    bottom: 0
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
   menuButton: {
   	top: 15,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  moreInfoButton: {
    bottom: 200,
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  getLocationButton: {
    bottom: 200,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  map: {
    height: height,
    width: width
  },
});
