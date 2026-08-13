import React, { useState } from 'react';
import axios from 'axios';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from '../../utils/RootParamList';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<RootParamList>;

const useLoginApi = () => {
  const [loading, setLoading] = useState(false);
  const [reset,setReset]=useState(false)
  const navigation = useNavigation<NavigationProp>();

  const loginHandler = async (email: string, password: string) => {
    setLoading(true);

    try {
      const response = await axios.post(
        'https://learnbackened.onrender.com/api/auth/login',
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'Welcome back!',
          position: 'top',
          visibilityTime: 3000,
        });

        console.log(response.data);

        navigation.navigate('AppStack');
        setReset(true)
      }
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2:
          e.response?.data?.message ||
          'Invalid email or password',
        position: 'top',
        visibilityTime: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loginHandler,
    loading,
    reset
  };
};

export default useLoginApi;