import react from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { Button } from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";



const Green = () => {
    
    const { data } = useLocalSearchParams();
    const parsedData = data ? JSON.parse(data) : {};


    const router = useRouter();
    const right =  require("../assets/images/coupon.png");

    const cuponclaim = async () => {
        const id = await AsyncStorage.getItem("outlet_id");
        const token = await AsyncStorage.getItem("login_token");

    
        if (!id || !token) {
          alert("Missing outlet ID or login token.");
         router.replace("/login");
          return;
        }
    
        const formData = new FormData();
        
        formData.append("outlet_id", id);
        formData.append("login_token", token);
        formData.append("copun_id", parsedData.id);
        // console.log("copun_id", data);
    
        const response = await fetch("https://staging.gamesngo.com/outlet/Api/claim_cupon", {
          method: "POST",
          headers: { "Content-Type": "multipart/form-data" },
          body: formData,
        });
    
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
    
        const result = await response.json();
        console.log("Response data:", result);
    
        if (result.message === "Coupon redeemed successfully") {
         
          router.replace("/claimed");
    
        } else {
          alert("Invalid coupon id");
        }
      }
    


    return (
        <ThemedView style={styles.container}>
            <Image source={right} style={styles.logo} />
            <View style={styles.cupondetails}>
            <Text style={styles.text}>Name: {parsedData.user_name}</Text>
        <Text style={styles.text}>Cupon ID: {parsedData.id}</Text>
            <Text style={styles.text}>Validity: {parsedData.time}</Text>
        <Text style={styles.text}>Discount : {parsedData.discount}</Text>
        </View>

        {/* <Text style={styles.text}>{amount}</Text> */}
        <View style={styles.rowstyle}>
        <TouchableOpacity onPress={cuponclaim}>
            <View style={styles.butto}>
                <Text style={styles.text1}>Confrim Claim</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace("/(tabs)/scan")}>
            <View style={styles.button}>
                <Text style={styles.text1}>Scan Again</Text>
            </View>
        </TouchableOpacity>
        </View>
        

        </ThemedView>
    );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        
        
    },
    rowstyle: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        
    
    },
    cupondetails: {
        backgroundColor: "#F7F9FD",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#D8DBEA",
    },
    text: {
        fontSize: 20,
        color: "#310D5A",
    },
    text1: {
        fontSize: 20,
        color: "#F7F9FD",
    },
    
    butto: {
        backgroundColor: "#310D5A",
        padding: 10,
        alignItems: "center",
        borderRadius: 5,
        marginTop: 20,
        
        // borderWidth: 1,
    },
    button: {
        backgroundColor: "#FF004F",
        padding: 10,
        alignItems: "center",
        borderRadius: 5,
        marginTop: 20,
        // borderWidth: 1,
    },
    logo: {
        
        height: 150,
        resizeMode: "contain",
        alignSelf: "center",
    },
});

export default Green;