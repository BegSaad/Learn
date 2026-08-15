import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainRoot from './src/navigation/MainRoot';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import store from './src/Redux-Toolkit/store';
export default function App() {
  
  return (
<Provider store={store}>
<SafeAreaProvider>
  <PaperProvider>
    <NavigationContainer>
      <MainRoot />
    </NavigationContainer>
    <Toast/>
    </PaperProvider>
    </SafeAreaProvider>
  </Provider>
  );
}