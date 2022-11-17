import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { getDatabase, push, ref, set, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import DoubleClick from "react-native-double-tap";
import { encode, decode } from "hex-encode-decode";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const MediaObject = (props) => {
  return (
    <DoubleClick
      activeOpacity={0.1}
      singleTap={() => {
        props.navigation.navigate("Detail", {
          mediaInfo: props.src,
        });
      }}
      doubleTap={() => {
        console.log("I am being double tapped");
        const encodedEmail = encode(getAuth().currentUser.email);
        const db = getDatabase();
        const movieRef = ref(db, `users/${encodedEmail}/movies`);
        const movieKey = props.src["id"];
        const movieObj = {};
        movieObj[movieKey] = props.src["original_title"];
        update(movieRef, movieObj).then(() => {
          console.log("movie added!");
        });
      }}
      delay={200}
    >
      <Image
        source={{
          uri: "https://image.tmdb.org/t/p/original" + props.src["poster_path"],
        }}
        style={styles.imageStyle}
        key={props.keyValue}
      />
    </DoubleClick>
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
