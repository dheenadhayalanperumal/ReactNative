import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const Styles = StyleSheet.create({
  look: {
    backgroundColor: "#FFAA10",
    borderRadius: 5,
  },
});

const LogoutButton = () => {
  const navigation = useRouter();
 
  const handleLogout = () => {
    AsyncStorage.removeItem("login_token");
    AsyncStorage.removeItem("outlet_id");
    AsyncStorage.removeItem("isLoggedIn");
    navigation.replace("/login");
  }

  return (
    <Button textColor="black" style={Styles.look} mode="contained" onPress={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;