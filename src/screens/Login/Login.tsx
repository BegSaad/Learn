import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import InputFields from '../../components/Forms/InputFields';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>

      <InputFields
        icon="mail"
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
      />

      <InputFields
        icon="lock-closed"
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
<TouchableOpacity 
onPress={()=>{
  
}}
>
  <Text>Forgot Password</Text>
</TouchableOpacity>
     

    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent:'center'
  },
  
});