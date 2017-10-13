import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import { View, Text, StyleSheet, Platform, Linking, Dimensions } from 'react-native'
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { blue, alertRed } from '../utils/colors'
import { toggleMission } from '../actions'

const InfoBox = (props) => {
  const { selectedMarker, region, toggleMission } = props

  const handleDirectionsToCar = () => {
    const { latitude, longitude } = selectedMarker.coord;
    const rla = region.latitude;
    const rlo = region.longitude;
    const url = Platform.OS === 'ios'
    ? `http://maps.apple.com/maps?saddr=${rla},${rlo}&daddr=${latitude},${longitude}&dirflg=d`
    : `http://maps.google.com/maps?saddr=${rla},${rlo}&daddr=${latitude},${longitude}&dirflg=d`
    if ( latitude ) { return Linking.openURL(url) }
  }

const handleDirectionsToDestination = () => {
    const { latitude, longitude } = selectedMarker.coord;
    const dla = selectedMarker.destination.latitude;
    const dlo = selectedMarker.destination.longitude;
    const url = Platform.OS === 'ios'
    ? `http://maps.apple.com/maps?saddr=${latitude},${longitude}&daddr=${dla},${dlo}&dirflg=d`
    : `http://maps.google.com/maps?saddr=${latitude},${longitude}&daddr=${dla},${dlo}&dirflg=d`
    if ( latitude ) { return Linking.openURL(url) }
  }

  const handletoggleMission = () => {
    if (selectedMarker.id) {
      toggleMission(selectedMarker)
    } 
  }

  const roundDestLat = selectedMarker.destination.latitude 
  ? selectedMarker.destination.latitude.toFixed(4) : ''
  const roundDestLng = selectedMarker.destination.longitude 
  ? selectedMarker.destination.longitude.toFixed(4) : ''

  const roundCoordLat = selectedMarker.coord.latitude 
  ? selectedMarker.coord.latitude.toFixed(4) : ''
  const roundCoordLng = selectedMarker.coord.longitude 
  ? selectedMarker.coord.longitude.toFixed(4) : ''

  const roundRegionLat = region.latitude ? region.latitude.toFixed(4) : ''
  const roundRegionLng = region.longitude ? region.longitude.toFixed(4) : ''
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Base Rate: {selectedMarker.bounty}</Text>
      <Text style={styles.text}>Description: {selectedMarker.description}</Text>
      <Text style={styles.text}>Address: {selectedMarker.address}</Text>
      <Text style={styles.text}>Destination: {roundDestLat}, {roundDestLng}</Text>

      <View style={styles.buttonContainer}>
      {
        // If your location is next to the car then you are able to unlcok it and route to the destination
        // otherwise you can route to where the car is
        // I've set one fake vehicle location to your location to test, so click on the marker that is in your location
        roundCoordLat === roundRegionLat
        ? <Button
          title={selectedMarker.acceptMission ? 'Abandon' : 'Unlock and Start'} 
          backgroundColor={selectedMarker.acceptMission ? alertRed : blue}
          buttonStyle={styles.button}
          onPress={handletoggleMission}
        />
        : <Button
          title='Route' 
          backgroundColor={blue}
          buttonStyle={styles.button}
          onPress={handleDirectionsToCar}
        />
      }
      </View>
    </View>
  )
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: width/1.2
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    margin: 10,
  },
  text: {
    alignItems: 'center',
    fontSize: 18,
  },
});

const mapStateToProps = (state) => {
  const { selectedMarker } = state.vehicleData;
  const { region } = state.mapData;
  return {
    selectedMarker,
    region,
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  return {
    toggleMission: (selectedMarker) => dispatch(toggleMission(selectedMarker)),
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(InfoBox)