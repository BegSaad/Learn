import React, { useState } from 'react';
import axios from 'axios';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from '../../utils/RootParamList';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setToken } from '../../Redux-Toolkit/AuthSlice';
import { createMMKV } from 'react-native-mmkv';

type NavigationProp = NativeStackNavigationProp<RootParamList>;

const storage = createMMKV();

const useLoginApi = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);
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
        setReset(true);
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
    reset,
  };
};

export default useLoginApi;