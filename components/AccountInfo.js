import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import { NavigationActions } from "react-navigation";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { lightGray, gray } from '../utils/colors'
import profilePic from '../img/temp.png'

const AccountInfo = (props) => {
  const routetoDispatch = NavigationActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({ routeName: "LoggedOut" })],
  })

  const toLoginScreen =() => {
    props.navigation.dispatch(routetoDispatch)
  }

  return (
    <View style={styles.container}>
      <View style={styles.personalInfoContainer}>
        <Image 
          source={profilePic} 
          resizeMode='contain'
          style={styles.profilePic}
        />
        <View style={styles.personalInfo}>
          <Text style={styles.name}>Some Guy</Text>
          <View style={styles.locationText}>
            <Text style={styles.subtext}>Austin, TX</Text>
            <Text style={styles.subtext}>United States</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.option}>
        <FontAwesome name="user" size={40}/>
        <Text style={styles.text}>Account Status</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => toLoginScreen()}>
        <FontAwesome name="power-off" size={40}/>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    height,
    width: width/1.3,
  },
  personalInfoContainer: {
    paddingVertical: 30,
    flexDirection: 'row',
    flexWrap: "wrap",
    alignItems: 'center',
  },
  personalInfo: {
    padding: 15
  },
  profilePic: {
    borderRadius: 30,
    width: 60,
    height: 60
  },
  name: {
    fontSize: 24
  },
  locationText: {
    marginVertical: 10
  },
  option: {
    flexDirection: 'row',
    flexWrap: "wrap",
    alignItems: 'center',
    marginVertical: 10
  },
  text: {
    alignItems: 'center',
    fontSize: 16,
    color: gray,
    paddingHorizontal: 10
  },
  subtext: {
    color: lightGray,
    fontSize: 12
  }
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
  const { navigate } = navigation;
  return {
    asd: () => dispatch(routetoDispatch)
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(AccountInfo)