import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import Payment from './src/screens/Payment/Payment';

import type { RootParamList } from './src/utils/RootParamList';

const Tab = createBottomTabNavigator<RootParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          name="Payment"
          component={Payment}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}