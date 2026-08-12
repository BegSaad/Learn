import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainRoot from './src/navigation/MainRoot';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
export default function App() {
  
  return (
<SafeAreaProvider>
  <PaperProvider>
    
    <NavigationContainer>
      <MainRoot />
    </NavigationContainer>
    <Toast/>
    </PaperProvider>
    </SafeAreaProvider>
  );
}