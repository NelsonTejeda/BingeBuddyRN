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

const DescriptionComponent = (props) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Descripton</Text>
        <Text style={styles.text}>
          {props.description}
          {"\n"}
        </Text>
        <Text style={styles.header}>Genres</Text>
        <Text style={styles.text}>{props.genres.toString()}</Text>
      </ScrollView>
      <Text style={styles.releaseDate}>Release Date: {props.releaseDate}</Text>
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
    shadowColor: "black",
  },
  text: {
    fontSize: 20,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
  },
  releaseDate: {
    position: "absolute",
    right: "10%",
    top: "2%",
  },
});

export default DescriptionComponent;
