import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { initializeApp, getApp } from "firebase/app";
import { firebase } from "@react-native-firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBNi_db0-LtgC289d-IRlLSxoqpqyWwHTA",
  authDomain: "bingebuddy-76c82.firebaseapp.com",
  projectId: "bingebuddy-76c82",
  storageBucket: "bingebuddy-76c82.appspot.com",
  messagingSenderId: "440209828043",
  appId: "1:440209828043:web:e4638a772fcceab2d0534e",
  measurementId: "G-KK9NTCCQB0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginScreen = ({ navigation }) => {
  const [userEmail, onChangeEmail] = React.useState("");
  const [userPassword, onChangePassword] = React.useState("");

  const callLoginWithPersistence = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        if (user) {
          navigation.navigate("Home");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  React.useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });
  }, []);

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={userEmail}
        placeholder="Email"
        autoCorrect={false}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={userPassword}
        placeholder="password"
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <Button
        title="Login"
        onPress={() => {
          callLoginWithPersistence(userEmail, userPassword);
        }}
      />
      <Button
        title="new user"
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default LoginScreen;
