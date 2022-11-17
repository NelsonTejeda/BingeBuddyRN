import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./App/screens/homeScreen";
import LoginScreen from "./App/screens/loginScreen";
import DetailScreen from "./App/screens/detailScreen";
import SignUpScreen from "./App/screens/signUpScreen";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

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

const Stack = createNativeStackNavigator();

const auth = getAuth(app);

export default function App() {
  const [isLoading, setLoading] = React.useState(true);
  auth.onAuthStateChanged((user) => {
    console.log(user);
    setLoading(false);
  });

  if (isLoading === false) {
    if (auth.currentUser === null) {
      console.log("user does not exist", auth.currentUser);
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  } else {
    return <ActivityIndicator size="large" />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
