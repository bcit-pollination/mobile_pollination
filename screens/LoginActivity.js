import React from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AppLogo from "../components/AppLogo";
import AppButton from "../components/AppButton";
import GlobalStyles from "../constants/GlobalStyles";

export default function LoginActivity({ navigation }) {
  return (
    <View style={{ flexDirection: "column" }}>
      <View classname="logo_large">
        <AppLogo />
      </View>

      <View>
        <AppButton
          style={[GlobalStyles.center, GlobalStyles.whiteBackground, styles.signIn]}
          onPress={() => navigation.navigate("Home")}
          text="Sign In"
        />
      </View>

      <View style={styles.register}>
        <AppButton
          style={[GlobalStyles.center, GlobalStyles.whiteBackground]}
          onPress={() => navigation.navigate("Register")}
          text="Register"
        />
      </View>
      {/* <Button onPress={() => { console.log('onpress') }} title='Manage Elections' color='white' /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  signIn: {
    marginTop: 60
  },
  register: {
    marginTop: 25,
  },
});
