import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  TextInput,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { Button } from "react-native-paper";

import firebase from "firebase";

const logo = require("../../assets/logo.png");

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = () => {
    firebase.auth().signInWithEmailAndPassword(email, password);
  };
  return (
    <SafeAreaView style={container.center}>
      <View style={container.formCenter}>
        <Image style={container.splash} source={logo} />

        <TextInput
          style={form.textInput}
          placeholder="email"
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={form.textInput}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

        <Button onPress={() => onSignUp()} mode="contained">
          Sign In
        </Button>
      </View>

      <View style={form.bottomButton}>
        <Text
          title="Register"
          onPress={() => props.navigation.navigate("Register")}
        >
          Don't have an account? SignUp.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const container = StyleSheet.create({
  center: {
    flex: 1,
  },
  formCenter: {
    justifyContent: "center",
    flex: 1,
    margin: 25,
  },
  splash: {
    alignSelf: "center",
    bottom: "10%",
  },
});

const form = StyleSheet.create({
  textInput: {
    marginBottom: 10,
    borderColor: "gray",
    backgroundColor: "whitesmoke",
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  bottomButton: {
    alignContent: "center",
    borderTopColor: "gray",
    borderTopWidth: 1,
    padding: 10,
    textAlign: "center",
  },
});
