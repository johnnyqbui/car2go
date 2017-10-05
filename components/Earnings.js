import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { purple } from '../utils/colors'

export default function Earnings () {
  return (
  	<View style={styles.container}>
	    <Text style={{color: purple, fontSize: 25}}>
	      Earnings
	    </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});