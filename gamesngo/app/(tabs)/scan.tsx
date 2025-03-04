import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from "expo-router";


const ScanPage: React.FC = () => { 
  const router = useRouter();

  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  

  

  const handleBarcodeScanned = ({ type, data }) => {
    
    router.replace(`/success?amount=${data}`);
    setScanned(true);

    
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
    height: 178,
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
