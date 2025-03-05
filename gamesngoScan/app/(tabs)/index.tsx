import { Image, StyleSheet, Platform, Button, View, Text } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";


export default function HomeScreen() {
  const router = useRouter();
  const [cupondata, setCuponData] = useState([]);
  const [totalCupons, setTotalCupons] = useState(0);
  const [outlet_name, setOutletName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        setLoading(true);
        const id = await AsyncStorage.getItem("outlet_id");
        const token = await AsyncStorage.getItem("login_token");
        const outlet = await AsyncStorage.getItem("outlet_name");

        if (!id || !token) {
          
          router.replace("/login");
          setLoading(false);
           // Navigate back to login
          return;
        }
        setOutletName(outlet);

        const formData = new FormData();
        formData.append("outlet_id", id);
        formData.append("login_token", token);

        const response = await fetch(
          "https://staging.gamesngo.com/outlet/Api/dashboard_for_api",
          {
            method: "POST",
            headers: { "Content-Type": "multipart/form-data" },
            body: formData,
          }
        );

        if (!response.ok) {
          setLoading(false);
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Response data:", data);
        if (data.login_status === "success") {
          setCuponData(data);
          setTotalCupons(data.claimed_copun_list + data.unclaimed_copun_list);
          setLoading(false);
        }
      } catch (error) {
        // console.error("Error:", error);
        setLoading(false);
        alert("Something went wrong. Please try again.");
      }
    };

    checkLogin();
  }, [router]);



  // const claimedCouponNumbers = [3]; // Example claimed coupon numbers
  // const unclaimedCouponNumbers = [6]; // Example unclaimed coupon numbers
  if(loading){
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FFAA10" />
      </View>
    );
  }


  return (
    <ParallaxScrollView 
    
      headerBackgroundColor={{ light: "#fffff", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/logo2.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.container}>
        <View style={styles.box1}>
          <Text style={styles.text}>Total Played Cupons</Text>
          <Text style={styles.textnum}>{totalCupons}</Text>
        </View>
        <View style={styles.box1}>
          <Text style={styles.text}>Claimed Cupons</Text>
          <Text style={styles.textnum}>{cupondata.claimed_copun_list}</Text>
        </View>
        <View style={styles.box1}>
          <Text style={styles.text}>Unclaimed Cupons</Text>
          <Text style={styles.textnum}>{cupondata.unclaimed_copun_list}</Text>
        </View>
      
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 15,
  },

  reactLogo: {
    height: 150,
    width: 300,
    resizeMode: "contain",
    alignSelf: "center",
  },
  box1: {
   flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    borderRadius: 10,
    height: 120,
    backgroundColor: "#310D5A",

  },
  text: {
    fontSize: 20,
    color: "white",
  },
  textnum: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },


});
