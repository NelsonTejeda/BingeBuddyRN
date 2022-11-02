import React, { useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import DescriptionComponent from "../components/descriptionComponent";
import ProvidersComponent from "../components/providersComponent";
import axios from "axios";
import YoutubePlayer from "react-native-youtube-iframe";

const width = Dimensions.get("window").width;
//TODO MUST BE SAVED IN THE DATABASE
const movieDbAPIKEY = "ffeb81772005d3aee4bffb4454637fd8&language";
const DetailScreen = ({ route }) => {
  const { mediaInfo } = route.params;
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [index, setIndex] = React.useState(0);
  const [isBold, setIsBold] = React.useState([
    styles.tabBold,
    styles.tabNormal,
    styles.tabNormal,
    styles.tabNormal,
  ]);
  const [trailer, setTrailer] = React.useState("");
  const [genres, setGenres] = React.useState([]);

  const getIndex = ({ nativeEvent }) => {
    isBold[index] = styles.tabNormal;
    const pos = Math.round(nativeEvent.contentOffset.x) / width;
    setIndex(pos);
    isBold[pos] = styles.tabBold;
  };

  const fetchTrailer = async (mediaId) => {
    const trailerObject = {
      method: "get",
      url: `https://api.themoviedb.org/3/movie/${mediaId}/videos?api_key=${movieDbAPIKEY}&language=en-US`,
    };
    try {
      const response = await axios(trailerObject);
      const mediaTrailer = response.data["results"][0]["key"];
      setTrailer(mediaTrailer);
    } catch (e) {
      console.log("failed to get trailer");
    }
  };

  const fetchGenres = async (mediaId) => {
    let temp = [];
    const detailObject = {
      method: "get",
      url: `https://api.themoviedb.org/3/movie/${mediaId}?api_key=${movieDbAPIKEY}&language=en-US`,
    };
    const response = await axios(detailObject);
    const medaiGenres = response.data["genres"];
    if (medaiGenres.length < 1) {
      return;
    }
    for (const [key, genres] of Object.entries(medaiGenres)) {
      temp.push(genres["name"]);
    }
    setGenres(temp);
  };

  useEffect(() => {
    fetchTrailer(mediaInfo["id"]);
    fetchGenres(mediaInfo["id"]);
  }, []);

  return (
    <View style={styles.detailView}>
      <YoutubePlayer height={250} videoId={trailer} />
      <View style={styles.tabNames}>
        <Text style={isBold[0]}>overview</Text>
        <Text style={isBold[1]}>providers</Text>
      </View>
      <ScrollView
        horizontal={true}
        decelerationRate={"fast"}
        snapToInterval={width}
        disableIntervalMomentum={true}
        onMomentumScrollEnd={getIndex}
      >
        <DescriptionComponent
          description={mediaInfo["overview"]}
          genres={genres}
          releaseDate={mediaInfo["release_date"]}
        />
        <ProvidersComponent mediaId={mediaInfo["id"]} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  detailView: {
    flex: 1,
    backgroundColor: "snow",
  },
  video: {
    width: width,
    height: 200,
  },
  tabNames: {
    marginTop: "0%",
    marginBottom: "5%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  tabBold: {
    fontWeight: "bold",
  },
  tabNormal: {
    fontWeight: "100",
  },
  testView: {
    backgroundColor: "blue",
    width: width,
    borderRadius: 20,
  },
  testView2: {
    backgroundColor: "green",
    width: width,
  },
});

export default DetailScreen;
