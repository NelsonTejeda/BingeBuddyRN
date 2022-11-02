import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import axios from "axios";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const movieDbAPIKEY = "ffeb81772005d3aee4bffb4454637fd8&language";

const ProvidersComponent = (props) => {
  const [rentProviders, setRentProviders] = React.useState([]);

  const fetchProviders = async (mediaId) => {
    let rentTemp = [];
    const providersObject = {
      method: "get",
      url: `https://api.themoviedb.org/3/movie/${mediaId}/watch/providers?api_key=${movieDbAPIKEY}&language=en-US`,
    };
    let response = "";
    try {
      response = await axios(providersObject);
    } catch (e) {
      console.log(e);
    }
    const providersUSA = response.data["results"]["US"];
    if (providersUSA == null) {
      return;
    }
    const link = providersUSA["link"];
    if (link == null || link == "") {
      link = "https://www.themoviedb.org/";
    }

    const rent = providersUSA["rent"];
    if (rent != null) {
      for (const [key, provider] of Object.entries(rent)) {
        try {
          rentTemp.push(
            `https://image.tmdb.org/t/p/original${provider["logo_path"]}`
          );
        } catch (e) {
          console.log("error");
        }
      }
    }
    try {
      setRentProviders(rentTemp);
    } catch (e) {
      console.log("error breaks");
    }
  };

  useEffect(() => {
    fetchProviders(props.mediaId);
  }, []);

  const displayRentProviders = () => {
    return (
      <FlatList
        data={rentProviders}
        renderItem={(logo) => {
          return (
            <Image
              style={styles.logosStyles}
              source={{ uri: logo.item, width: 50, height: 50 }}
            />
          );
        }}
        keyExtractor={(item) => item}
        numColumns={~~(width / 50)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text>Buy</Text>
      <Text>Rent</Text>
      <View style={styles.logoContainer}>{displayRentProviders()}</View>
      <Text>FlatRate</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 0,
    width: width,
    backgroundColor: "white",
    padding: "3%",
    //shadowColor: "black",
  },
  logosStyles: {
    borderRadius: 20,
    marginRight: "2%",
    marginTop: "2%",
  },
  logoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default ProvidersComponent;
