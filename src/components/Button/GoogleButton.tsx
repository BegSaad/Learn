import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import { Ionicons } from '@react-native-vector-icons/ionicons';
type ButtonProps=
{
    title:string;
     icon?: React.ComponentProps<typeof Ionicons>['name'];
    onPress:()=>void;
}
const GoogleButton = ({title,icon,onPress}:ButtonProps) => {
  return (
   <TouchableOpacity
   onPress={onPress}
   >

<View style={{flexDirection:'row',alignItems:'center', justifyContent:'center',backgroundColor:'#fff',padding:10,borderRadius:8,marginVertical:5,borderWidth:1,borderColor:'#ccc' }}>
          {icon && (
            <Ionicons
              name={icon}
              size={22}
              color="#ccc"
              style={styles.leftIcon}
            />
          )}
    <Text>{title}</Text>
    </View> 
   </TouchableOpacity>
  )
}

export default GoogleButton

const styles = StyleSheet.create({
     leftIcon: {
    marginRight: 6,
  },
})