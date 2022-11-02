import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import MediaObject from "./mediaObject";
import React, { useEffect, useState } from "react";
import axios from "axios";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const MediaSwiper = (props) => {
  const baseUrl =
    "https://api.themoviedb.org/3/movie/popular?api_key=ffeb81772005d3aee4bffb4454637fd8&language=en-US&page=1";

  const [moviesPoster, setMoviePoster] = useState([]);

  const fetchMoiveMedia = async () => {
    let temp = [];
    const movieObjects = {
      method: "get",
      url: `${baseUrl}/api/users/1`,
    };
    try {
      const response = await axios(movieObjects);
      const listOfMovies = response["data"]["results"];
      for (const [key, movie] of Object.entries(listOfMovies)) {
        temp.push(movie);
      }
      setMoviePoster(temp);
      //return temp;
    } catch (e) {
      console.log("failed to get movies");
      //return [];
    }
  };

  useEffect(() => {
    fetchMoiveMedia();
  }, []);

  return (
    <View>
      <FlatList
        data={moviesPoster}
        renderItem={({ item }) => {
          return <MediaObject src={item} navigation={props.navigation} />;
        }}
        keyExtractor={(item, index) => index.toString()}
        key={(item) => item.id}
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToInterval={height}
        disableIntervalMomentum={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: height,
    width: width,
  },
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MediaSwiper;
