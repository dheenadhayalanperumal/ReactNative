import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logo = require("../Image/Logo.png");

export default function Login() {
  const navigation = useNavigation();
  const [data, setData] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleFocus1 = () => setIsFocused1(true);
  const handleBlur = () => setIsFocused(false);
  const handleBlur1 = () => setIsFocused1(false);

  const handleLogin = () => {
    const formData = new FormData();
    formData.append("mobile_number", data); // Assuming mobile_number is the key for username field
    formData.append("password", password); // Assuming password is the key for password field

    fetch("https://nmwinternet.com/staging/demo/admin/Api/login_auth", {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        if (data.status === true) {
          // console.log(data);
          AsyncStorage.setItem("token", data.user_details.login_token);
          AsyncStorage.setItem("userId", data.user_details.id);
          AsyncStorage.setItem("userName", data.user_details.staff_name);
          
          AsyncStorage.setItem("isLoggedIn", "1")
            .then(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "Home1" }], // Use 'Home1' as that's the name in your stack navigator
              });
              // replace this with the actual condition for a successful login
              navigation.navigate("Home1");
            })
            .catch((error) => {
              console.error("AsyncStorage Error:", error);
            });
        } else {
          // Display an alert if the username or password is incorrect
          alert(
            "invailed username and password."
          );
        }
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View>
          <Image style={styles.Logo} source={Logo} />
          <TextInput
            style={isFocused ? styles.focusedText : styles.text}
            placeholder="Enter your ID"
            placeholderTextColor="#fff"
            value={data}
            keyboardType="numeric"
            onChangeText={setData}
            numberOfLines={1}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <TextInput
            style={isFocused1 ? styles.focusedText : styles.text}
            placeholder="Enter the Password"
            placeholderTextColor="#fff"
            secureTextEntry
            onChangeText={setPassword}
            numberOfLines={1}
            onFocus={handleFocus1}
            onBlur={handleBlur1}
          />
          <TouchableOpacity style={styles.Button} onPress={handleLogin}>
            <Text style={styles.ButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A20A3A",
    alignItems: "center",
    justifyContent: "space-around",
  },
  Button: {
    color: "#000",
    backgroundColor: "#FFAA10",
    borderWidth: 1,
    borderColor: "#FFAA10",
    borderRadius: 5,
    width: 296,
    height: 43,
    padding: 10,
    marginTop: 10,
    textAlign: "center",
  },
  ButtonText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
  },
  Logo: {
    width: 234,
    height: 217,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 50,
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    color: "#FFF",
    fontSize: 15,
    borderWidth: 0.5,
    borderColor: "#fff",
    height: 43,
    width: 296,
    padding: 10,
  },
  focusedText: {
    paddingLeft:16,
    marginTop: 10,
    marginBottom: 10,
    height: 43,
    width: 296,
    color: "#fff",
    fontSize: 15,
    borderWidth: 2,
    borderColor: "#fff",
    Animation: "fadeIn 0.5s",
  },
});