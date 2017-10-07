import React, { Component }from "react";
import { View, Text, StyleSheet, Dimensions, Animated, Easing } from "react-native";
import { Card, Button, FormInput } from "react-native-elements";
import { lightGray, blue } from '../utils/colors'
import * as Progress from 'react-native-progress';

export default class LoadingScreen extends Component {
  state = {
    timer: null,
    progress: 0,
  };

  componentDidMount() {
    const timer = setInterval(this.navigate, 1500);
    this.setState(state => ({
      timer,
      progress: state.progress + 1,
    }))
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }

  navigate = () => {
    // if loading is done, then navigate to loggin screen
    const { progress } = this.state;
    const { navigation } = this.props;
    if (progress === 1) {
      clearInterval(this.state.timer)
      navigation.navigate("LoggedIn")
    }
  }

  render() {
    const { progress } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Acquiring GPS...</Text>
        <Text style={styles.text}>Connecting to Control Mission</Text>
        <View style={styles.progressContainer}>
          <Progress.Bar 
            progress={progress} 
            width={width/1.2} 
            height={20}
            color={blue}
            unfilledColor={lightGray}
            borderColor={'rgba(0,0,0,0)'}
            animationType={'timing'}
            animationConfig={{
              duration: 1500,
              easing: Easing.out(Easing.ease),
            }}
          />
        </View>
      </View>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  progressContainer: {
    margin: 75
  },
  text: {
    fontSize: 24
  }
});