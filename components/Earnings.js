import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { cyan } from '../utils/colors'

export default function Earnings () {
  return (
  	<View style={styles.container}>
	    <Text style={{color: cyan, fontSize: 25}}>
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
