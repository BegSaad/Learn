import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
type Props={
    title:string;
    onPress:()=>void;
    disabled?:boolean;
    loading?:boolean
}
const PrimaryButton = ({title,onPress,disabled,loading}:Props) => {
  return (
  <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={{
       backgroundColor: loading ? 'white' : '#bf059a',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 5,
      }}
    >
      <Text style={{ color: loading? '#bf059a':'white' }}>
       
         {loading ? (

        <ActivityIndicator size="small" color="#bf059a" />

      ) : (

        <Text style={{ color: 'white' }}>{title}</Text>

      )}
      </Text>
    </TouchableOpacity>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({})