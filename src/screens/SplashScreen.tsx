import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';

import { RootParamList } from '../utils/RootParamList';
import { setToken } from '../Redux-Toolkit/AuthSlice';
import { createMMKV } from 'react-native-mmkv';
const storage = createMMKV();

type SplashScreenNavigationProp =
  NativeStackNavigationProp<RootParamList, 'SplashScreen'>;

const SplashScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const accessToken = storage.getString('accessToken');
    const refreshToken = storage.getString('refreshToken');
    const userId = storage.getString('userId');
    const name = storage.getString('name');
    const email = storage.getString('email');

    if (refreshToken) {
      // Restore MMKV data into Redux
      dispatch(
        setToken({
          accessToken: accessToken ?? '',
          refreshToken,
          userId: userId ?? '',
          name: name ?? '',
          email: email ?? '',
        })
      );

      navigation.replace('AppStack');
    } else {
      navigation.replace('AuthStack');
    }
  }, [dispatch, navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;