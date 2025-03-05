import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ScanPage: React.FC = () => { 
  const router = useRouter();

  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);


  

  const [isFetching, setIsFetching] = useState(false);

  const handleBarcodeScanned = async ({ type, data }) => {
    if (isFetching) return;
    setIsFetching(true);
  
    try {
      const id = await AsyncStorage.getItem("outlet_id");
      const token = await AsyncStorage.getItem("login_token");
  
      if (!id || !token) {
        alert("Missing outlet ID or login token.");
        setIsFetching(false);
        return;
      }
  
      const formData = new FormData();
      
      formData.append("outlet_id", id);
      formData.append("login_token", token);
      formData.append("copun_id", data);
      // console.log("copun_id", data);
  
      const response = await fetch("https://staging.gamesngo.com/outlet/Api/Get_coupon_list", {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const result = await response.json();
      // console.log("Response data:", result);
  
      if (result.login_status === "success") {
        setScanned(true);
        // router.replace("/claimed")
        router.replace(`/success?data=${encodeURIComponent(JSON.stringify(result))}`);

      } else {
        alert("Invalid QR code.");
      }
    } catch (error) {
      // console.error("Fetch Error:", error);
      alert("Failed to scan the QR code. Please try again.");
    } finally {
      setIsFetching(false);
    }
  };
  
  


  if (!permission) {
    // Camera permissions are still loading.
    return <ThemedView />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.message}>We need your permission to show the camera</ThemedText>
        <Button onPress={requestPermission} title="grant permission" />
      </ThemedView>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <ThemedView style={styles.container}>
       <Image
          source={require('@/assets/images/logo2.png')}
          style={styles.reactLogo}
        />
     <CameraView 
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={styles.box}

      />
        {scanned && (
          <ThemedView style={styles.buttonshape}>
        <Button  title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      </ThemedView>
      )}

    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    
    height: 300,
    width: 300,
    borderRadius: 10,
    overflow: 'hidden',

  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  reactLogo: {
    height: 150,
    width: 290,
    resizeMode: 'contain',
  },
  buttonshape: {
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },

});

export default ScanPage;
