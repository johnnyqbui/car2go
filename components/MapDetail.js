import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, ActivityIndicator } from 'react-native'
import { AppLoading, Location, Permissions, Constants } from 'expo'
import { Foundation, FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import MapView from 'react-native-maps'
import { white, blue } from '../utils/colors'
import LoadingScreen from './LoadingScreen'

class MapDetail extends Component {
  state = {
    status: null,
    direction: '',
    region: {
      // Austin, TX
      latitude: 30.2672,
      longitude: -97.7431,
      latitudeDelta: 0.2822,
      longitudeDelta: 0.3021,
    },
    markers: []
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
      this.setState({
        status: 'granted',
        region: {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.75,
          longitudeDelta: 0.5,
        },
      })

      //********* TEMP FUNCTION FOR DUMMY DATA *****************//
      if (this.state.markers.length === 0) {
        this.mountDummyData(coords.latitude, coords.longitude)
      }
    })
  }

  //******************* DUMMY VEHICLE DATA RELATIVE TO CURRENT LOCATION, DELETE AFTER GETTING ACTUAL VEHICLE DATA ********************//
  mountDummyData = (latitude, longitude) => {
    const randomCoords = [];
    const distanceFromBase = .2;
    const markerAmount = 40;
    const baseCoord = {
      latitude, 
      longitude
    };

    for (let i = 0; i < markerAmount; i++) {
      let randomLatitude = Math.random() * ((Math.random() <= 0.5 
        ? (baseCoord.latitude - distanceFromBase) 
        : (baseCoord.latitude + distanceFromBase)) - baseCoord.latitude) + baseCoord.latitude;
      let randomLongitude = Math.random() * ((Math.random() <= 0.5 
        ? (baseCoord.longitude - distanceFromBase) 
        : (baseCoord.longitude + distanceFromBase)) - baseCoord.longitude) + baseCoord.longitude
      randomCoords.push({
        latlng: {
          latitude: randomLatitude,
          longitude: randomLongitude
        },
        title: 'Some random vehicle',
        description: 'Bounty info'
      })
    }

    this.setState({
      markers: randomCoords
    })
  }
  //*****************************************************************************************************//

  watchPosition = () => {
    Location.watchPositionAsync({
      enableHighAccuracy: true,
      timeInterval: 1,
      distanceInterval: 1,
    }, ({ coords }) => {
      const newDirection = calculateDirection(coords.heading)
      const { direction, bounceValue } = this.state

      this.setState(() => ({
        coords,
        status: 'granted',
        direction: newDirection,
      }))
    })
  }

  render() {
    const { status, coords, direction } = this.state
    const { navigation } = this.props;

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
            style={styles.map}
            region={this.state.region}
            showsUserLocation={true}>
            {this.state.markers.map((marker, i) => 
              <MapView.Marker
                key={i}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
                zIndex={i}
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
  return {
    state,
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  return {
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapDetail)