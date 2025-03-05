import react from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";




const claimed = () => {
    
    const router = useRouter();
    const right = require("../assets/images/right.png")


    return (
        <View style={styles.container}>
            <Image source={right} style={styles.logo} />
        <Text style={styles.text}>Coupon Claimed successfully</Text>
        {/* <Text style={styles.text}>{amount}</Text> */}
        <TouchableOpacity onPress={() => router.replace("/(tabs)/explore")}>
            <View style={styles.butto}>
                <Text style={styles.text}>Continue</Text>
            </View>
        </TouchableOpacity>
        </View>
    );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#310D5A",
    },
    text: {
        fontSize: 20,
        color: "white",
    },
    butto: {
        backgroundColor: "#FFAA10",
        padding: 10,
        alignItems: "center",
        borderRadius: 5,
        marginTop: 20,
        // borderWidth: 1,
    },
    logo: {
        width: 156,
        height: 156,
        resizeMode: "contain",
        alignSelf: "center",
    },
});

export default claimed;