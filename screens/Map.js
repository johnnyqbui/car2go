import React, { Component } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  Image, 
  Animated, 
  Easing,
  TouchableHighlight, 
  TouchableOpacity, 
  ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading, Location, Permissions, Constants } from 'expo'
import { Foundation, FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { getAllVehicles, getVehicleInfo } from '../actions/VehicleActions'
import { openInfoBox, closeInfoBox, getCurrentLocation } from '../actions/MapActions'

import MapView, { Circle } from 'react-native-maps'
import markerIcon from '../img/generic-blue.png'
import { white, blue } from '../utils/colors'
import LoadingScreen from './LoadingScreen'
import InfoBox from '../components/InfoBox'
import AccountInfo from '../components/AccountInfo'
import TabSummary from '../components/TabSummary'

class Map extends Component {
  
   // Options for tab navigation
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      tabBarVisible: params.tabBarVisible
    }
  }

  state = {
    status: null,
    left: new Animated.Value(-width),
    bottom: new Animated.Value(-200)
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

  openInfoBox = (e, marker) => {
    const { bottom } = this.state
    const { getVehicleInfo, navigation, openInfoBox } = this.props;
    e.stopPropagation(); 

    Animated.timing(bottom, { 
      toValue: 0, 
      duration: 600,
    }).start()

    navigation.setParams({
      tabBarVisible: false
    })

    const {
      id, 
      coord, 
      bounty, 
      description, 
      address, 
      destination
    } = marker;

    this.refs.map.fitToCoordinates([coord, destination], {
      edgePadding: { top: 100, right: 50, bottom: 250, left: 50 },
      animated: true,
    })

    getVehicleInfo(marker)
    openInfoBox();
  }

  closeInfoBox = () => {
    const { bottom } = this.state;
    const { getVehicleInfo, navigation, closeInfoBox } = this.props;

    Animated.timing(bottom, { 
      toValue: -200,
      duration: 600,
    }).start()

    navigation.setParams({
      tabBarVisible: true
    })

    const marker = {
      id: null,
      coord: {},
      bounty: '',
      description: '', 
      address: '',
      destination: {}
    }
    getVehicleInfo(marker)
    closeInfoBox()
  }

  openAccountInfo = () => {
    const { left } = this.state;
    const { navigation } = this.props;

    Animated.timing(left, { 
      toValue: 0,
      duration: 400,
    }).start()

    // navigation.setParams({
    //   tabBarVisible: false
    // })
  }

  closeAccountInfo = () => {
    const { left } = this.state;
    const { navigation } = this.props;

    Animated.timing(left, { 
      toValue: -width,
      duration: 800,
    }).start()

    // navigation.setParams({
    //   tabBarVisible: true
    // })
  }

  reset = () => {
    this.closeInfoBox()
    this.closeAccountInfo()
  }

  render() {
    const { status, image, bottom, left } = this.state
    const { navigation, region, selectedMarker, markers, infoBox } = this.props

    if (status === null || Object.keys(region).length === 0) {
      return (
        <LoadingScreen />
      )
    } 

    if (status === 'denied') {
      return (
        <View style={styles.deniedScreen}>
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
          <Animated.View style={[styles.accountInfoContainer, { left }]}>
            <AccountInfo navigation={navigation}/>
          </Animated.View>
          <TabSummary openAccountInfo={this.openAccountInfo} />
          <MapView
            ref="map"
            style={styles.map}
            initialRegion={region}
            showsUserLocation={true}
            // to prevent marker from center on android
            moveOnMarkerPress={false}
            onPress={() => this.reset()}>
            {markers.map((marker, i) => 
              <MapView.Marker
                key={i}
                zIndex={i}
                coordinate={marker.coord}
                onPress={(e) => this.openInfoBox(e, marker)}>
                <Image
                  source={markerIcon}
                  style={selectedMarker.id !== null && marker.id !== selectedMarker.id ? styles.hide : styles.marker}
                />
              </MapView.Marker>
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
            style={styles.getLocationButton}
            onPress={this.centerCurrentLocation}
            underlayColor='grey'>
            <MaterialIcons name="my-location" size={30} color='black'/>
          </TouchableHighlight>
          <Animated.View style={[styles.infoBoxContainer, { bottom }]}>
            <InfoBox closeInfoBox={this.closeInfoBox}/>
          </Animated.View>
        </View>
      )
    }
  }
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    flex: 1,
    flexDirection: 'row',
    width: width,
    backgroundColor: 'rgb(5, 10, 48)'
  },
  deniedScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
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
    top: 40,
    right: 0,
    margin: 15,
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
  marker: {
    width: 26,
  },
  hide: {
    width: 0,
  },
  show: {
    display: 'flex'
  },
  accountInfoContainer: {
    zIndex: 10,
    position: 'absolute',
  },
  infoBoxContainer: {
    zIndex: 10,
    position: 'absolute',
  }
});


const mapStateToProps = (state, { navigation }) => {
  const { vehicleData, mapData, progressBarData } = state;
  const { selectedMarker, markers } = vehicleData;
  return {
    region: mapData.region,
    progress: progressBarData.progress,
    markers,
    selectedMarker,
    navigation
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  return {
    getAllVehicles: (coords) => dispatch(getAllVehicles(coords)),
    getVehicleInfo: (coords) => dispatch(getVehicleInfo(coords)),
    getCurrentLocation: (coords) => dispatch(getCurrentLocation(coords)),
    openInfoBox: () => dispatch(openInfoBox()),
    closeInfoBox: () => dispatch(closeInfoBox())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map)