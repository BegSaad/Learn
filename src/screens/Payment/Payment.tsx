import { Text, View, Button } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import usePaymentApi from './usePaymentApi';

const Payment = () => {
  const auth = useSelector((state: any) => state.auth);
  const { makePayment, loading } = usePaymentApi();

  return (
    <View>
      <Text>Payment Screen</Text>

      <Text>Name: {auth.name}</Text>
      <Text>Email: {auth.email}</Text>

      <Button
        title={loading ? 'Processing...' : 'Make Payment'}
        onPress={makePayment}
        disabled={loading}
      />
    </View>
  );
};

export default Payment;