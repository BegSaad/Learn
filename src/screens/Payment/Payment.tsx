import { Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

const Payment = () => {
  const auth = useSelector((state: any) => state.auth);

  return (
    <View>
      <Text>Payment</Text>

      <Text>Access Token: {auth.accessToken}</Text>
      <Text>Refresh Token: {auth.refreshToken}</Text>
      <Text>Name: {auth.name}</Text>
      <Text>Email: {auth.email}</Text>
    </View>
  );
};

export default Payment;