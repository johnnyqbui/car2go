import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Entypo, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons'
import { cyan, gray, lightGray } from '../utils/colors'

export default function Account () {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{color: cyan, fontSize: 25}}>
          Estimated Payout $95.74
        </Text>
      </View>

      <TouchableOpacity style={styles.link}>
        <Entypo name="share" style={styles.icon} size={25} />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.text}>
            Invites
          </Text>
          <Text style={styles.subText}>
            Earn extra $50 for every friend you refer to drive!
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link}>
        <SimpleLineIcons name="notebook" style={styles.icon} size={25} />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.text}>
            Trip History
          </Text>
          <Text style={styles.subText}>
            Last Trip: $10.20
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link}>
        <Entypo name="credit-card" style={styles.icon} size={25} />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.text}>
            Instant Pay
          </Text>
          <Text style={styles.subText}>
            Cash out your eearnings for free anytime
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link}>
        <MaterialIcons name="view-week" style={styles.icon} size={25} />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.text}>
            Weekly Earnings
          </Text>
          <Text style={styles.subText}>
            Last week's earnings: $120.24
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
