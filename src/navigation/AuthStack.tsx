import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from '../screens/Login/Login'
import SignUp from '../screens/SignUp/SignUp'
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword'
import { RootParamList } from '../utils/RootParamList'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const AuthStack = () => {
  const Stack = createNativeStackNavigator<RootParamList>();

  return (
    <Stack.Navigator 
    screenOptions={{
        headerShown:false
    }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})