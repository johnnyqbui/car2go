import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import { View, Text, StyleSheet, Slider, Platform, Linking, Dimensions } from 'react-native'
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { blue, alertRed, gray } from '../utils/colors'
import { toggleMission, getDestination } from '../actions'

const FilterPanel = (props) => {
  const { selectedMarker, region, toggleMission, getDestination } = props
  // max, unit, step, value, onChange

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
    <View style={styles.filterContainer}>
      <View style={styles.row}>
        <Slider
          style={{flex: 1}}
          step={step}
          value={value}
          maximumValue={max}
          minimumValue={0}
          onValueChange={onChange}
        />
        <View style={styles.metricCounter}>
          <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
          <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Slider
          style={{flex: 1}}
          step={step}
          value={value}
          maximumValue={max}
          minimumValue={0}
          onValueChange={onChange}
        />
        <View style={styles.metricCounter}>
          <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
          <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
        </View>
      </View>
    </View>
  )
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  filterContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: width/1.2
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center'
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
)(FilterPanel)