import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Text, View } from "react-native";



export default function TabTwoScreen() {
  const data = {
    days: [
      {
        cuponid: "1",
        username: "John Doe",
        climedamount: "$100",
      },
      {
        cuponid: "2",
        username: "Jane Doe",
        climedamount: "$200",
      },
      {
        cuponid: "3",
        username: "John Smith",
        climedamount: "$300",
      },
    ],
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#fff', dark: '#353636' }}
      headerImage={
        <Image
        source={require('@/assets/images/logo2.png')}
        style={styles.reactLogo}
      />
      }>
<ThemedText style={styles.titleContainer}>Claimed Coupon</ThemedText>
                 <View style={styles.container}>

         <View>
                {data.days.map((cupon, index) => {
                                       
                    return (
                        <View key={index} style={styles.smallbox}>
                            <Text style={styles.subtitle}>{cupon.cuponid}</Text>
                            {/* <Image source={sun} style={styles.image} /> */}
                            <Text style={styles.subtitle}>{cupon.username}</Text>
                            <Text style={styles.subtitle}>{cupon.climedamount}</Text>
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
    fontSize: 22,
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 8,
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
    backgroundColor: "#00C1F6",
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
    color: "white",
    fontSize: 12,
  },
  subtitle1: {
    color: "yellow",
    fontSize: 8,
  },
  reactLogo: {
   
    height: 150,
    width: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
  
  },
});
