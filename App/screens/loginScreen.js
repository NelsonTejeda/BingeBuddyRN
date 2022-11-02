import { StyleSheet, Text, View, Button } from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <Button
      title="home"
      onPress={() => {
        navigation.navigate("Home");
      }}
    />
  );
};

export default LoginScreen;
