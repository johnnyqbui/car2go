import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
import { gray } from '../utils/colors'
import profilePic from '../img/temp.png'
import { toggleAccountInfo } from '../actions/AccountInfoActions'

const TabSummary = (props) => {
  const { infoBoxIsOpen, openAccountInfo } = props;
  return (
  	<View style={styles.container}>
      <TouchableOpacity 
        style={styles.profileImgContainer}
        onPress={() => openAccountInfo()}>
        <Image 
          source={profilePic} 
          resizeMode='contain'
          style={styles.profilePic}
        />
      </TouchableOpacity>
      <Text style={styles.text}>{infoBoxIsOpen ? "Mission Preview" : "Ready For Mission"}</Text>
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

const mapStateToProps = (state) => {
  const { infoBoxIsOpen } = state.mapData;
  return {
    infoBoxIsOpen
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  return {
    toggleAccountInfo: () => dispatch(toggleAccountInfo()),
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(TabSummary)