import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Styles = StyleSheet.create({
  look: {
    backgroundColor: "#FFAA10",
    borderRadius: 5,
  },
});

const LogoutButton = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("userId");
    AsyncStorage.removeItem("isLoggedIn");
    navigation.navigate("Login");
  };

  return (
    <Button textColor="black" style={Styles.look} mode="contained" onPress={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;