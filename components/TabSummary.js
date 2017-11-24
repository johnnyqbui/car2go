import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
import { gray } from '../utils/colors'
import profilePic from '../img/temp.png'

export default TabSummary = () => {
  return (
  	<View style={styles.container}>
      <TouchableOpacity style={styles.profileImgContainer}>
        <Image 
          source={profilePic} 
          resizeMode='contain'
          style={styles.profilePic}
        />
      </TouchableOpacity>
      <Text style={styles.text}>Ready For Mission</Text>
    </View>
  )
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    top: 0,
    zIndex: 6,
    width: width,
    height: 45,
    position: 'absolute',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  profileImgContainer: {
    borderRadius: 15,
    width: 30,
    height: 30,
    margin: 12.5
  },
  profilePic: {
    borderRadius: 15,
    width: 30,
    height: 30
  },
  text: {
    paddingLeft: 30,
    fontSize: 20,
    color: gray
  }
});
