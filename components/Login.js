import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Card, Button, FormInput } from "react-native-elements";
import { onLogIn } from "../auth/_auth";
import { darkBlue, blue } from '../utils/colors'

export default ({ navigation }) => (
  <View style={ styles.container }>
  	<View style={ styles.titleContainer }>
 			<Text style={ styles.title }>FLEETSHIFTER</Text>
 		</View>

    <FormInput 
    	containerStyle={ styles.inputContainer }
    	inputStyle={ styles.input } 
    	placeholder="Car2Go Login" 
    	placeholderTextColor="white"
    />

    <FormInput 
    	containerStyle={ styles.inputContainer }
	    inputStyle={ styles.input } 
	    secureTextEntry 
	    placeholder="Password" 
	    placeholderTextColor="white"
    />

    <Button
    	containerViewStyle={ styles.buttonContainer }
      buttonStyle={ styles.button }
      backgroundColor= { blue }
      title="Sign In with Car2Go"
      onPress={() => {
        onLogIn().then(() => navigation.navigate("LoggedIn"));
      }}
    />
  </View>
);

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkBlue,
  },
  titleContainer: {
  	height: height/5,
  	justifyContent: 'center',
  	alignItems: 'center'
  },
  title: {
  	color: 'white',
  	fontSize: 36,
  	fontWeight: 'bold'
  },
  inputContainer: {
  	marginVertical: 10
  },
  input: {
  	color: 'white',
  },
  buttonContainer: {
  	alignItems: 'center',
  },
  button: {
  	marginTop: 100,
  	borderRadius: 10,
  	paddingHorizontal: 20
  }
});
