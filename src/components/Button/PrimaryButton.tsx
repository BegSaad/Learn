import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
type Props={
    title:string;
    onPress:()=>void;
}
const PrimaryButton = ({title,onPress}:Props) => {
  return (
 <TouchableOpacity onPress={onPress}
 style={{backgroundColor:'#bf059a',padding:10,borderRadius:8,alignItems:'center',marginVertical:5  }}
 >
    <View>
        <Text style={{color:'white'}}>{title}</Text>
    </View>
 </TouchableOpacity>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({})