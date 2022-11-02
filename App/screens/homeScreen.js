import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-swiper";
import MediaSwiper from "../components/mediaSwiper";

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });
  }, []);
  return (
    <Swiper showsButtons={false} loop={false} loadMinimal={true}>
      <MediaSwiper navigation={navigation} />
      <View>
        <Text>Hello Swiper</Text>
      </View>
    </Swiper>
  );
};

export default HomeScreen;
