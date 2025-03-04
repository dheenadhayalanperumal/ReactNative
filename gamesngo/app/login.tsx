import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const Logo = require("../assets/images/logo2.png");

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleFocus1 = () => setIsFocused1(true);
  const handleBlur1 = () => setIsFocused1(false);

  const handleLogin = () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    fetch("https://staging.gamesngo.com/outlet/Api/login", {
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
        if (data.login_status === "success") {
          AsyncStorage.setItem("login_token", data.login_token);
          AsyncStorage.setItem("outlet_id", data.outlet_id);
          AsyncStorage.setItem("isLoggedIn", "true")
            .then(() => {
              console.log(data);
              router.replace("/(tabs)");
            })
            .catch((error) => {
              console.error("AsyncStorage Error:", error);
            });
        } else {
          alert("Invalid username or password.");
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
            placeholder="Enter your Email ID"
            placeholderTextColor="#1e1370"
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
            numberOfLines={1}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <TextInput
            style={isFocused1 ? styles.focusedText : styles.text}
            placeholder="Enter the Password"
            placeholderTextColor="#1e1370"
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
    backgroundColor: "light",
    alignItems: "center",
    justifyContent: "space-around",
  },
  Button: {
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
    color: "black",
    fontSize: 15,
    borderWidth: 0.5,
    borderColor: "#2e17d4",
    height: 43,
    width: 296,
    padding: 10,
    borderRadius: 5,
  },
  focusedText: {
    paddingLeft: 16,
    marginTop: 10,
    marginBottom: 10,
    height: 43,
    width: 296,
    color: "black",
    fontSize: 15,
    borderWidth: 2,
    borderColor: "#1e1370",
    borderRadius: 5,
  },
});
