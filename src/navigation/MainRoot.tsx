import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootParamList } from '../utils/RootParamList'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/SplashScreen'
import AppStack from './AppStack'
import AuthStack from './AuthStack'

const MainRoot = () => {
    const Stack= createNativeStackNavigator<RootParamList>();
  return (
    <Stack.Navigator 
    screenOptions={{
        headerShown:false
    }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="AppStack" component={AppStack} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
    </Stack.Navigator>
  )
}

export default MainRoot

const styles = StyleSheet.create({})