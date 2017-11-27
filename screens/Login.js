import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Card, Button, FormInput } from "react-native-elements";
import { onLogIn } from "../auth/_auth";
import { darkBlue, blue, lightGray } from '../utils/colors'

export default ({ navigation }) => (
  <View style={ styles.container }>
  	<View style={ styles.titleContainer }>
 			<Text style={ styles.title }>FLEETSHIFTER</Text>
 		</View>

    <FormInput 
    	containerStyle={ styles.inputContainer }
    	inputStyle={ styles.input } 
    	placeholder="Car2Go Login" 
    	placeholderTextColor={lightGray}
    />

    <FormInput 
    	containerStyle={ styles.inputContainer }
	    inputStyle={ styles.input } 
	    secureTextEntry 
	    placeholder="Password" 
	    placeholderTextColor={lightGray}
    />

    <Button
    	containerViewStyle={ styles.buttonContainer }
      buttonStyle={ styles.button }
      backgroundColor= { blue }
      title="Sign In with Car2Go"
      fontSize={20}
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
    backgroundColor: 'white',
  },
  titleContainer: {
    marginTop: 120,
    marginBottom: 20,
  	justifyContent: 'center',
  	alignItems: 'center'
  },
  title: {
  	color: 'black',
  	fontSize: 38,
  	fontWeight: 'bold'
  },
  inputContainer: {
  	marginVertical: 10
  },
  input: {
  	color: lightGray,
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
  	marginTop: 10,
  	paddingHorizontal: 20,
  }
});
