import React from "react";
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onLogIn } from "../auth/_auth";

export default ({ navigation }) => (
  <View style={{ paddingVertical: 20 }}>
    <Card>
      <FormLabel>Email</FormLabel>
      <FormInput placeholder="Email address..." />
      <FormLabel>Password</FormLabel>
      <FormInput secureTextEntry placeholder="Password..." />

      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="LOG IN"
        onPress={() => {
          onLogIn().then(() => navigation.navigate("LoggedIn"));
        }}
      />
    </Card>
  </View>
);