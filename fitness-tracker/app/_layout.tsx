import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, createContext, useContext, useState, ReactNode } from 'react';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

interface ClickCountContextType {
  count: number;
  incrementCount: () => void;
}

const ClickCountContext = createContext<ClickCountContextType | undefined>(undefined);

export const ClickCountProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <ClickCountContext.Provider value={{ count, incrementCount }}>
      {children}
    </ClickCountContext.Provider>
  );
};

export const useClickCount = () => {
  const context = useContext(ClickCountContext);
  if (!context) {
    throw new Error('useClickCount must be used within a ClickCountProvider');
  }
  return context;
};

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClickCountProvider>
      <Stack>
        {/* Disable the header for the index screen */}
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* Other screens retain the default header */}
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ClickCountProvider>
  );
}
