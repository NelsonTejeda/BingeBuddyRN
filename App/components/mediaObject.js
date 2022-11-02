import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const MediaObject = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        props.navigation.navigate("Detail", {
          mediaInfo: props.src,
        });
      }}
    >
      <Image
        source={{
          uri: "https://image.tmdb.org/t/p/original" + props.src["poster_path"],
        }}
        style={styles.imageStyle}
        key={props.keyValue}
      />
    </TouchableOpacity>
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

export default MediaObject;
