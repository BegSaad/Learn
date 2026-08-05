import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
const Maps = () => {
  return (
    <SafeAreaView>
    <View>
      <Text>Maps</Text>
      <Ionicons
  name="home"
  size={30}
  color="blue"
/>
<Ionicons name="camera-reverse" color="#000" size={24} />
    </View>
    </SafeAreaView>
  )
}

export default Maps

const styles = StyleSheet.create({})