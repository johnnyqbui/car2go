import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import { View, Text, StyleSheet, Platform, Linking, Dimensions } from 'react-native'
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { blue } from '../utils/colors'

const InfoBox = (props) => {
  const { selectedMarker, region } = props

  const handleDirections = () => {
    const { latitude, longitude } = selectedMarker.coord;
    const rla = region.latitude;
    const rlo = region.longitude;
    const url = Platform.OS === 'ios'
    ? `http://maps.apple.com/maps?saddr=${rla},${rlo}&daddr=${latitude},${longitude}&dirflg=d`
    : `http://maps.google.com/maps?saddr=${rla},${rlo}&daddr=${latitude},${longitude}&dirflg=d`
    if ( latitude ) {
      return Linking.openURL(url);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bounty Rate: {selectedMarker.bounty}</Text>
      <Text style={styles.text}>Description: {selectedMarker.description}</Text>
      <Text style={styles.text}>Address: {selectedMarker.address}</Text>
      <Button
        icon={{name: 'directions'}}
        title='Directions' 
        backgroundColor={blue}
        buttonStyle={styles.button}
        onPress={handleDirections}
      />
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
  button: {
    margin: 10
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
    getAllVehicles: (coords) => dispatch(getAllVehicles(coords)),
    getVehicleInfo: (coords) => dispatch(getVehicleInfo(coords)),
    getRegion: (coords) => dispatch(getRegion(coords)),
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(InfoBox)