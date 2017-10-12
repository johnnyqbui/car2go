import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, Animated, TouchableHighlight, TouchableOpacity, ActivityIndicator } from 'react-native'
import { AppLoading, Location, Permissions, Constants } from 'expo'
import { Foundation, FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import MapView, { Circle } from 'react-native-maps'
import { white, blue } from '../utils/colors'
import LoadingScreen from './LoadingScreen'
import { getAllVehicles, getVehicleInfo, getCurrentLocation, getDestination, clearDestination } from '../actions'
import InfoBox from './InfoBox'

class Map extends Component {
  state = {
    status: null,
    toggleInfoBox: false,
  }

  shouldComponentUpdate({ progress }) {
    // Loading Screen
    return progress > 0
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
    const { getAllVehicles, getCurrentLocation, markers } = this.props;
    Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    }).then(({ coords }) => {
      this.setState({ status: 'granted' })
      const region = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      }
      
      getCurrentLocation(region)

      //********* TEMP FUNCTION FOR DUMMY DATA *****************//
      if (markers.length === 0) {
        getAllVehicles(coords)
      }
    })
  }

  centerCurrentLocation = () => {
    const { region } = this.props;
    this.refs.map.animateToRegion(region, 300)
  }

  openInfoBox = ({ id, color, coord, bounty, description, address, destination }) => {
    const { toggleInfoBox } = this.state
    const { getVehicleInfo, clearDestination } = this.props;
    const selectedMarker = {
      id, 
      color: 'green', 
      coord, 
      bounty, 
      description, 
      address, 
      destination
    }

    this.refs.map.animateToRegion({
      latitude: coord.latitude,
      longitude: coord.longitude,
      latitudeDelta: .25,
      longitudeDelta: .25,
    }, 300)

    getVehicleInfo(selectedMarker)

    this.setState({
      toggleInfoBox: true
    })

  }

  closeInfoBox = () => {
    const { getVehicleInfo } = this.props;
    const selectedMarker = {
      id: null,
      color: '',
      coord: {},
      bounty: '',
      description: '', 
      address: '',
      destination: {}
    }
    
    getVehicleInfo(selectedMarker)

    this.setState({
      toggleInfoBox: false
    })
  }

  render() {
    const { status, toggleInfoBox } = this.state
    const { navigation, region, selectedMarker, markers } = this.props

    console.log(selectedMarker.destination)
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
            initialRegion={region}
            showsUserLocation={true}
            loadingEnabled={true}
            onPress={() => this.closeInfoBox()}>
            {markers.map((marker, i) => 
              <MapView.Marker
                key={i}
                zIndex={i}
                coordinate={marker.coord}
                pinColor={marker.id === selectedMarker.id ? selectedMarker.color : 'red'}
                onPress={(e) => {e.stopPropagation(); this.openInfoBox(marker)}}
              />
            )}
            {selectedMarker.destination.latitude &&
              <Circle 
                key={selectedMarker.destination.latitude + selectedMarker.destination.longitude}
                center={selectedMarker.destination} 
                radius={1000}
                strokeColor={blue}
                fillColor={'rgba(65, 80, 191, .4)'}/>
            }
            
          </MapView>

          <TouchableHighlight
            style={[styles.button, styles.getLocationButton]}
            onPress={this.centerCurrentLocation}
            underlayColor='grey'>
            <MaterialIcons name="my-location" size={30} color='black'/>
          </TouchableHighlight>
          <View style={styles.infoBoxContainer}>
            <InfoBox />
          </View>
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
    top: 75,
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
  infoBoxContainer: {
    zIndex: 6,
    position: 'absolute',
    alignItems: 'center',
    right: 0,
    left: 0,
    bottom: 0,
  }
});


const mapStateToProps = (state, { navigation }) => {
  const { vehicleData, mapData, progressBarData } = state;
  const { selectedMarker, markers, toggleMission } = vehicleData;
  console.log(selectedMarker.destination)
  return {
    region: mapData.region,
    progress: progressBarData.progress,
    markers,
    selectedMarker,
    navigation,
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  return {
    getAllVehicles: (coords) => dispatch(getAllVehicles(coords)),
    getVehicleInfo: (coords) => dispatch(getVehicleInfo(coords)),
    getCurrentLocation: (coords) => dispatch(getCurrentLocation(coords)),
    getDestination: (region) => dispatch(getDestination(region)),
    clearDestination: () => dispatch(clearDestination())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map)