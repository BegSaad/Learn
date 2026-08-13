import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import InputFields from '../../components/Forms/InputFields';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from '../../utils/RootParamList';
import PrimaryButton from '../../components/Button/PrimaryButton';
import GoogleButton from '../../components/Button/GoogleButton';
import Toast from 'react-native-toast-message';
type NavigationProp = NativeStackNavigationProp<RootParamList>;
import useLoginApi from './useLoginApi';
const Login = () => {
  const {loginHandler,loading,reset}:any= useLoginApi();
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
<Text style={{fontSize:30, fontWeight:'bold', marginBottom:20}}>Welcome Back</Text>
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
        onPress={() => navigation.navigate('ForgotPassword')}
        style={{alignSelf: 'flex-end', marginBottom: 20}}
      >
        <Text>Forgot Password</Text>
      </TouchableOpacity>

      <PrimaryButton
     loading={loading}
     disabled={loading}
        title="Login"
          onPress={() => {
                if (!email.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Email Required',
        text2: 'Please enter your email',
      });
      return;
    }
    if (!password.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Password Required',
        text2: 'Please enter your password',
      });
      return;

    }
            loginHandler(email,password)
          
          
          
          if(reset){
setEmail(''),
setPassword('')
          }
          
          
          
          
          }
          
          
          
          
          
          }
     
      
      />

     <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', marginVertical:10 }}>
      <View style={{backgroundColor:'#ccc', height:1, flex:1}}/>
      <Text style={{textAlign:'center',marginVertical:10}}>or continue with Google</Text>
      <View style={{backgroundColor:'#ccc', height:1, flex:1}}/>
     </View>
      <GoogleButton
        title="Continue with Google"
        icon="logo-google"
        onPress={() => {
console.log("login with google pressed")
        }}
      />
 <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
        style={{alignSelf: 'flex-end', marginTop: 20}}
      >
        <Text>Dont have an account? Sign up</Text>
      </TouchableOpacity>

    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});