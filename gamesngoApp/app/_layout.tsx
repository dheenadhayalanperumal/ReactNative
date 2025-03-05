import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FFAA10" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="(tabs)/index" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="(tabs)/scan" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="(tabs)/explore" options={{ headerShown: true }} /> */}
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="success" options={{ headerShown: false }} />
        <Stack.Screen name="claimed" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
    
