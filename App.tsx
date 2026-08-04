import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainRoot from './src/navigation/MainRoot';
import type { RootParamList } from './src/utils/RootParamList';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator<RootParamList>();

export default function App() {
  return (
<SafeAreaProvider>
    <NavigationContainer>
      <MainRoot />
    </NavigationContainer>
    </SafeAreaProvider>
  );
}