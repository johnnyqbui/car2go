import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableHighlight } from 'react-native'
import { AppLoading, Location, Permissions, Constants } from 'expo'
import { FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import MapView from 'react-native-maps'
import { white, blue } from '../utils/colors'

class MapDetail extends Component {
  state = {
    status: null,
    currentLocation: null,
    region: {
      latitude: 30.2672,
      longitude: -97.7431,
      latitudeDelta: 0.2822,
      longitudeDelta: 0.3021,
    },
    ready: false
  }

  static navigationOptions = ({ navigation }) => {
    console.log(navigation.navigate)
  }

  componentDidMount() {
    console.log('mount dummy car data here')
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
    return (
      <View style={styles.container}>
        <MapView
            style={styles.map}
            region={this.state.region}
            showsUserLocation={true}
          />

          <TouchableHighlight
            ref="location"
            style={[styles.button, styles.getLocationButton]}
            onPress={this.getLocation}
            underlayColor='grey'>
            <MaterialIcons name="my-location" size={30} color='black'/>
          </TouchableHighlight>
      </View>
    )
  }
}

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
  getLocationButton: {
    zIndex: 3,
    bottom: 0,
    right: 0,
    margin: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 5
  },
  map: {
    height: height,
    width: width
  },
});


function mapStateToProps (state, { navigation }) {
  console.log(navigation)
  return {
    state,
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  console.log(navigation)
  return {
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapDetail)