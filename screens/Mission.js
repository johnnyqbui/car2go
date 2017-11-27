import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { cyan, gray, lightGray } from '../utils/colors'

export default Mission = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.link}>
        <Entypo name="help" style={styles.icon} size={25} />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.text}>
            Help
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link}>
        <FontAwesome name="exclamation-circle" style={styles.icon} size={25} />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.text}>
            About
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link}>
        <MaterialIcons name="settings" style={styles.icon} size={25} />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.text}>
            Settings
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  link: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: lightGray,
    borderBottomWidth: 1,
    borderBottomColor: lightGray,
  },
  icon: {
    paddingHorizontal: 25
  },
  text: {
    alignItems: 'center',
    fontSize: 25,
  },
});
