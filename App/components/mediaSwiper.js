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
  const [updateListener, setUpdateListener] = useState(false);
  const [pos, setPos] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const baseUrl = `https://api.themoviedb.org/3/movie/popular?api_key=ffeb81772005d3aee4bffb4454637fd8&language=en-US&page=${pageNumber}`;

  const [moviesPoster, setMoviePoster] = useState([]);

  const fetchMoiveMedia = async () => {
    //TODO: PAGE 500 is max. Add accordingly.
    let temp = [];
    const movieObjects = {
      method: "get",
      url: baseUrl,
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

  const nextPageOfMovies = async () => {
    const nextUrl = `https://api.themoviedb.org/3/movie/popular?api_key=ffeb81772005d3aee4bffb4454637fd8&language=en-US&page=${
      pageNumber + 1
    }`;
    setPageNumber(pageNumber + 1);
    console.log(nextUrl);
    let temp = [];
    const movieObjects = {
      method: "get",
      url: nextUrl,
    };
    try {
      const response = await axios(movieObjects);
      const listOfMovies = response["data"]["results"];
      for (const [key, movie] of Object.entries(listOfMovies)) {
        temp.push(movie);
      }
      setMoviePoster(moviesPoster.concat(temp));
      //return temp;
    } catch (e) {
      console.log("failed to get movies");
      //return [];
    }
  };

  useEffect(() => {
    if (updateListener) {
      nextPageOfMovies();
      setUpdateListener(false);
    }
    if (moviesPoster.length === 0) {
      fetchMoiveMedia();
    }
  }, [updateListener]);

  return (
    <View>
      <FlatList
        data={moviesPoster}
        renderItem={({ item, index }) => {
          return <MediaObject src={item} navigation={props.navigation} />;
        }}
        keyExtractor={(item, index) => index.toString()}
        key={(item) => item.id}
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToInterval={height}
        disableIntervalMomentum={true}
        // extraData={updateListener}
        onEndReached={() => {
          0.5;
          setUpdateListener(true);
        }}
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
