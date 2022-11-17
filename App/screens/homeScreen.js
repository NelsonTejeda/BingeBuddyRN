import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Swiper from "react-native-swiper";
import MediaSwiper from "../components/mediaSwiper";
import { getAuth } from "firebase/auth";
import { CommonActions, StackActions } from "@react-navigation/native";

const pushAction = StackActions.push("Login");

const HomeScreen = ({ navigation }) => {
  return (
    <Swiper showsButtons={false} loop={false} loadMinimal={true}>
      <MediaSwiper navigation={navigation} />
      <View>
        <Button
          onPress={() => {
            //console.log("AUTH:", auth.currentUser);
            const auth = getAuth();
            auth.signOut().then(() => {
              navigation.navigate("Login");
              console.log(auth.currentUser);
            });
          }}
          title="Sign Out"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </Swiper>
  );
};

export default HomeScreen;
