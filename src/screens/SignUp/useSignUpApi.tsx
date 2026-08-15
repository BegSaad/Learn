import axios from 'axios';
import React,{useState} from 'react';
import Toast from 'react-native-toast-message';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from '../../utils/RootParamList';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setToken } from '../../Redux-Toolkit/AuthSlice';
import { createMMKV } from 'react-native-mmkv';

type signUpvalues={
    name:string,
    email:string,
    password:string

}
type NavigationProp = NativeStackNavigationProp<RootParamList>;
const storage = createMMKV();
const useSignUpApi = () => {
   const dispatch = useDispatch();
    const [loading,setLoading]= useState(false);
      const navigation = useNavigation<NavigationProp>();
  const signUp = async (values: signUpvalues) => {
    setLoading(true)
    try {
        
      const response = await axios.post(
        'https://learnbackened.onrender.com/api/auth/registerNew',
        {
          username: values.name,
          email: values.email,
          password: values.password,
        },
      );
                 setLoading(false)
                 console.log(response.data);

      if (response.status === 200 || response.status === 201) {
        Toast.show({
          type: 'success',
          text1: 'Registered Successfully',
          text2: 'Welcome to the app',
          position: 'top',
          visibilityTime: 3000,
        });
const { accessToken, refreshToken, user } = response.data;

        // Save to MMKV
        storage.set('accessToken', accessToken);
        storage.set('refreshToken', refreshToken);
        storage.set('userId', user.id);
        storage.set('name', user.username);
        storage.set('email', user.email);

        // Save to Redux
        dispatch(
          setToken({
            accessToken,
            refreshToken,
            userId: user.id,
            name: user.username,
            email: user.email,
          })
        );
  navigation.navigate('AppStack');
        return response.data;
      }
    } catch (e: any) {
      console.log(e.response?.data);

      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: e.response?.data?.message || 'Please register again',
        position: 'top',
        visibilityTime: 3000,
      });
    }
    finally{
        setLoading(false)
    }
  };

  return {
    signUp,
    loading
  };
};

export default useSignUpApi;