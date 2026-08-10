import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from '../utils/RootParamList';

type SplashScreenNavigationProp =
  NativeStackNavigationProp<RootParamList, 'SplashScreen'>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  const userExist = false;

  const checkUserExist = React.useCallback(() => {
    if (userExist) {
      navigation.replace('AppStack');
    } else {
      navigation.replace('AuthStack');
    }
  }, [navigation, userExist]);

  useEffect(() => {
    checkUserExist();
  }, [checkUserExist]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
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