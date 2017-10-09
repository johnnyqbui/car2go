import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, Animated, TouchableHighlight, TouchableOpacity, ActivityIndicator } from 'react-native'
import { AppLoading, Location, Permissions, Constants } from 'expo'
import { Foundation, FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import MapView from 'react-native-maps'
import { white, blue } from '../utils/colors'
import LoadingScreen from './LoadingScreen'

import { getAllVehicles, getVehicleInfo, getRegion } from '../actions'

class MapDetail extends Component {
  state = {
    status: null,
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props)
    console.log(nextProps)
  }

  componentDidMount() {
    Permissions.askAsync(Permissions.LOCATION)
      .then(({ status }) => {
        if (status === 'granted') {
          this.setLocation()
        }

        this.setState(() => ({ status }))
      })
      .catch((error) => {
        console.warn('Error getting Location permission: ', error)
        this.setState(() => ({ status: 'undetermined' }))
      })
  }

  setLocation = () => {
    Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    }).then(({ coords }) => {
      this.setState({ status: 'granted' })
      const region = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.75,
        longitudeDelta: 0.5,
      }
      //********* TEMP FUNCTION FOR DUMMY DATA *****************//
      const { getAllVehicles, getRegion, vehicleData } = this.props;
      getRegion(region)
      if (vehicleData.markers.length === 0) {
        getAllVehicles(coords)
      }
    })
  }

  handleOpenInfoBox = ({ id, color, coord, bounty, description, address }) => {
    const selectedMarker = {
      id, 
      color: 'green', 
      coord, 
      bounty, 
      description, 
      address 
    }

    const { getRegion, getVehicleInfo } = this.props;
    getRegion(coord)
    getVehicleInfo(selectedMarker)
  }

  // handleNavigation = (la, lo) => {
  //   const rla = this.region.latitude;
  //   const rlo = this.region.longitude;
  //   const url = `http://maps.apple.com/?saddr=${rla},${rlo}&daddr=${la},${lo}&dirflg=d`;
  //   return Linking.openURL(url);
  // }

  render() {
    const { status } = this.state
    const { navigation, mapData, vehicleData } = this.props
    const { selectedMarker, markers } = vehicleData

    if (status === null) {
      return (
        <LoadingScreen />
      )
    } 

    if (status === 'denied') {
      return (
        <View style={styles.center}>
          <Foundation name='alert' size={50} />
          <Text>
            You denied your location. You can fix this by going to your settings and enabling location services for this app.
          </Text>
        </View>
      )
    }

    if (status === 'granted') {
      return (
        <View style={styles.container}>
          <MapView
            ref="map"
            style={styles.map}
            region={mapData.region}
            showsUserLocation={true}
            loadingEnabled={true}>
            {markers.map((marker, i) => 
              <MapView.Marker
                key={i}
                zIndex={i}
                coordinate={marker.coord}
                pinColor={marker.id === selectedMarker.id ? selectedMarker.color : 'red'}
                onPress={() => this.handleOpenInfoBox(marker)}
              />
            )}
          </MapView>

          <TouchableHighlight
            ref="location"
            style={[styles.button, styles.getLocationButton]}
            onPress={this.setLocation}
            underlayColor='grey'>
            <MaterialIcons name="my-location" size={30} color='black'/>
          </TouchableHighlight>
        </View>
      )
    }
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  button: {
    padding: 10,
    backgroundColor: blue,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  },
  buttonText :{
    color: white,
    fontSize: 20,
  },
  directionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 35,
    textAlign: 'center',
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
  const { vehicleData, mapData } = state;
  console.log(state)
  return {
    mapData,
    vehicleData,
    navigation
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  return {
    getAllVehicles: (coords) => dispatch(getAllVehicles(coords)),
    getVehicleInfo: (coords) => dispatch(getVehicleInfo(coords)),
    getRegion: (coords) => dispatch(getRegion(coords)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapDetail)