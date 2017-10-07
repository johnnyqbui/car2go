import React, { Component }from "react";
import { View, Text, StyleSheet, Dimensions, Animated, Easing } from "react-native";
import { Card, Button, FormInput } from "react-native-elements";
import { lightGray, blue } from '../utils/colors'
import * as Progress from 'react-native-progress';

export default class LoadingScreen extends Component {
  static defaultProps = {
    progressIncrements: 1,
    progressDuration: 1500
  }

  state = {
    timer: null,
    progress: 0,
  };

  componentDidMount() {
    const { progressIncrements, progressDuration } = this.props;
    const timer = setInterval(this.progress, progressDuration);
    this.setState(state => ({
      timer,
      progress: state.progress + progressIncrements,
    }))
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }

  progress = () => {
    // if loading is done, then navigate to loggin screen
    const { progress } = this.state;
    const { navigation, progressIncrements } = this.props;

    if (progress === 1) {
      clearInterval(this.state.timer)
      navigation.navigate("LoggedIn")
    } else {
      this.setState(state => ({
        progress: state.progress + progressIncrements,
      }))
    }
  }

  render() {
    const { progress } = this.state;
    const { progressDuration } = this.props;
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
              duration: progressDuration,
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