import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import { View, Text, StyleSheet, Platform, Linking, Dimensions } from 'react-native'
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { blue, alertRed } from '../utils/colors'
import { toggleMission, getDestination } from '../actions'

const InfoBox = (props) => {
  const { selectedMarker, region, toggleMission, getDestination } = props

  const handleDirections = () => {
    const { latitude, longitude } = selectedMarker.coord;
    const rla = region.latitude;
    const rlo = region.longitude;
    const url = Platform.OS === 'ios'
    ? `http://maps.apple.com/maps?saddr=${rla},${rlo}&daddr=${latitude},${longitude}&dirflg=d`
    : `http://maps.google.com/maps?saddr=${rla},${rlo}&daddr=${latitude},${longitude}&dirflg=d`
    if ( latitude ) { return Linking.openURL(url) }
  }

  const handletoggleMission = () => {
    if (selectedMarker.id) {
      toggleMission(selectedMarker)
      getDestination(region)
    } 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bounty Rate: {selectedMarker.bounty}</Text>
      <Text style={styles.text}>Description: {selectedMarker.description}</Text>
      <Text style={styles.text}>Address: {selectedMarker.address}</Text>
      <View style={styles.buttonContainer}>
        <Button
          icon={{name: 'flag', type: 'entypo', size: 26 }}
          title={selectedMarker.acceptMission ? 'Abandon' : 'Accept'} 
          backgroundColor={selectedMarker.acceptMission ? alertRed : blue}
          buttonStyle={styles.button}
          onPress={handletoggleMission}
        />
        <Button
          icon={{name: 'directions', size: 26 }}
          title='Directions' 
          backgroundColor={blue}
          buttonStyle={styles.button}
          onPress={handleDirections}
        />
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
    region
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  return {
    toggleMission: (selectedMarker) => dispatch(toggleMission(selectedMarker)),
    getDestination: (region) => dispatch(getDestination(region)),
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(InfoBox)