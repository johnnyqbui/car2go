import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { cyan, gray, lightGray } from '../utils/colors'

export default function Earnings () {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../img/logo.png')}/>
        <Text style={{color: cyan, fontSize: 25}}>
          Fleetshifter
        </Text>
      </View>

      <TouchableOpacity style={styles.link}>
        <MaterialIcons name="person" style={styles.icon} size={25} />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.text}>
            Login
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link}>
        <MaterialIcons name="person-add" style={styles.icon} size={25} />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.text}>
            Register
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link}>
        <Entypo name="text-document-inverted" style={styles.icon} size={25} />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.text}>
            Documents
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
  header: {
    margin: 50,
    alignItems: 'center',
    flexDirection: 'row'
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
  subText: {
    fontSize: 15,
    color: gray,
  }
});
