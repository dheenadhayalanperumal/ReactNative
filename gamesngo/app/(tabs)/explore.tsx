import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Text, View } from "react-native";
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function TabTwoScreen() {
  const [data, setCuponData] = useState([]);

  useEffect(() => {

    const getdata = async () => {
      const id = await AsyncStorage.getItem("outlet_id");
      const token = await AsyncStorage.getItem("login_token");
      console.log("outlet_id", id);
      console.log("login_token", token);

      const formData = new FormData();
      formData.append("outlet_id", id);
      formData.append("login_token", token);
      fetch("https://staging.gamesngo.com/outlet/Api/get_claimed_copun_list", {

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
          // console.log("Response data:", data);
          if (data.login_status === "success") {
            setCuponData(data.claimed_coupons);
          }
        })
        .catch((error) => {
          // console.error("Error:", error);
          alert("Something went wrong. Please try again.");
        });
    }
    getdata();
  }
    , []);


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#fff', dark: '#353636' }}
      headerImage={
        <Image
        source={require('@/assets/images/coupon.png')}
        style={styles.reactLogo}
      />
      }>
<ThemedText style={styles.titleContainer}>Claimed Coupon</ThemedText>
                 <View style={styles.container}>
                  
                 <View style={styles.smallbox1}>
                            {/* <Text style={styles.subtitle}>{cupon.id}</Text> */}
                            {/* <Image source={sun} style={styles.image} /> */}
                            <Text style={styles.subtitle1}>Name</Text>
                            <Text style={styles.subtitle1}>Time</Text>
                            <Text style={styles.subtitle1}>%</Text>
                        </View>

         <View>
                {data.map((cupon, index) => {
                                       
                    return (
                        <View key={index} style={styles.smallbox}>
                            {/* <Text style={styles.subtitle}>{cupon.id}</Text> */}
                            {/* <Image source={sun} style={styles.image} /> */}
                            {
                              cupon.name === null ?
                              <Text style={styles.subtitle}>{cupon.mobile_no}</Text>
                              :
                              <Text style={styles.subtitle}>{cupon.name}</Text>


                            }
                            <Text style={styles.subtitle}>{cupon.redeemed_time}</Text>
                           
                            <Text style={styles.subtitle}>{cupon.discount}</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    
     
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    paddingLeft: 15,
    paddingRight: 15,
},
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
   
    width: "100%",
   fontSize: 25,
    textAlign: "center",
   
    
  },
  marginRight: {
    marginRight: 10, // This handles the spacing between items
  },
  noMargin: {
    marginRight: 0,
  },
  smallbox: {
    height: 45,
   
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#E4E4E4",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.36,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 10
    ,
    
  },
  image: {
    width: 30,
    height: 30,
resizeMode: "contain",
  },
  subtitle: {
    color: "#310D5A",
    fontSize: 12,
  },
  subtitle1: {
    color: "#e9ecef",
    fontSize: 15,
    fontWeight: 500,
    justifyContent: "space-evenly",

  },
  reactLogo: {
   
    height: 150,
    width: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
  
  },
  smallbox1: {
    height: 45,
   
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#310D5A",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
  },
  shadowOpacity: 0.36,
  shadowRadius: 3,
  elevation: 3,
  marginBottom: 10
  ,
    
  },
  
});
