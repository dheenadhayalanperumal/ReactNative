import { Image, StyleSheet, Platform, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (isLoggedIn !== "true") {
        router.replace('/login'); // Navigate back to login
      }
    };

    checkLogin();
  }
  , []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    await AsyncStorage.removeItem("login_token");  
    await AsyncStorage.removeItem("outlet_id");  

    router.replace('/login'); // Navigate back to login
    
  };

  const claimedCouponNumbers = [3]; // Example claimed coupon numbers
  const unclaimedCouponNumbers = [6]; // Example unclaimed coupon numbers

  return (
    <ParallaxScrollView 
      headerBackgroundColor={{ light: '#fffff', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/logo2.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.box123}>
      <ThemedView style={styles.stepContainer}>
        <ThemedText style={styles.titleContainer}>Claimed Coupon</ThemedText>
       
          <ThemedText style={styles.titleContainer1}>{claimedCouponNumbers}</ThemedText>
       
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText style={styles.titleContainer}>Unclaimed Coupon</ThemedText>
        <ThemedText style={styles.titleContainer1}>{unclaimedCouponNumbers}</ThemedText>
      </ThemedView>
      </ThemedView>
      

    
      <ThemedView >
        <Button title="Get Started" onPress={handleLogout} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
        alignItems: 'center',  
    fontSize: 20,
   
  },
  titleContainer1: {
    fontSize: 20,
    color: 'blue',
  },
  stepContainer: {
    height: 190,
  alignItems: 'center',
  justifyContent: 'space-evenly',
  backgroundColor: '#FFAA10',
     },
  reactLogo: {
   
    height: 150,
    width: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
  
  },

  box123: {
   flexDirection: 'column',
    height: 400,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor:"#FFAA10",


   
  },
});
