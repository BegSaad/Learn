import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from '../utils/RootParamList';

type SplashScreenNavigationProp =
  NativeStackNavigationProp<RootParamList, 'SplashScreen'>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  const userExist = true;

  const checkUserExist = () => {
    if (userExist) {
      navigation.replace('AppStack');
    } else {
      navigation.replace('AuthStack');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkUserExist();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading...</Text>
    </View>
  );
};

export default SplashScreen;