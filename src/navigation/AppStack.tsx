import React from 'react';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import Payment from '../screens/Payment/Payment';
import Maps from '../screens/Maps/Maps';
import Account from '../screens/Account/Account';
import { RootParamList } from '../utils/RootParamList';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const AppStack = () => {
  const BottomTab = createBottomTabNavigator<RootParamList>();
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTab.Screen name="HomeScreen" component={HomeScreen} />
      <BottomTab.Screen name="Payment" component={Payment} />
      <BottomTab.Screen name="Maps" component={Maps} />
        <BottomTab.Screen name="Account" component={Account} />
    </BottomTab.Navigator>
  );
};

export default AppStack;