import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainRoot from './src/navigation/MainRoot';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  
  return (
<SafeAreaProvider>
  <PaperProvider>
    
    <NavigationContainer>
      <MainRoot />
    </NavigationContainer>
    </PaperProvider>
    </SafeAreaProvider>
  );
}