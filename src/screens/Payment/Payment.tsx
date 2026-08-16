import { Text, View } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import RazorpayCheckout from 'react-native-razorpay';

import usePaymentApi from './usePaymentApi';
import InputFields from '../../components/Forms/InputFields';
import PrimaryButton from '../../components/Button/PrimaryButton';

const Payment = () => {
  const auth = useSelector((state: any) => state.auth);

  const [amount, setAmount] = useState('');
  const [processing, setProcessing] = useState(false);

  const {
    createOrder,
    verifyPayment,
    loading,
  } = usePaymentApi();

  const handlePayment = async () => {
    if (processing || loading) {
      return;
    }

    // Validate amount
    if (!amount || Number(amount) <= 0) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Amount',
        text2: 'Please enter a valid amount',
      });

      return;
    }

    try {
      setProcessing(true);

      /*
       * STEP 1
       * Create Razorpay order from backend
       */
      const order = await createOrder(Number(amount));

      if (!order) {
        return;
      }

      console.log('Razorpay Order:', order);

      /*
       * STEP 2
       * Open Razorpay Checkout
       */
      const razorpayKey = order.key || order.key_id || 'rzp_test_TLlQcCkBoLJwGr';

      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency || 'INR',
        name: 'Attendance App',
        description: 'Attendance Payment',
        order_id: order.id,
        prefill: {
          name: auth.name || '',
          email: auth.email || '',
          contact: auth.phone || '',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const paymentData = await RazorpayCheckout.open(options);

      console.log('Razorpay Payment Data:', paymentData);

      /*
       * STEP 3
       * Send payment details to backend
       * Backend will verify the Razorpay signature
       */
      const verificationResult =
        await verifyPayment(paymentData);

      if (verificationResult?.success) {
        Toast.show({
          type: 'success',
          text1: 'Payment Successful',
          text2:
            verificationResult.message ||
            'Payment completed successfully',
        });

        // You can clear the amount after successful payment
        setAmount('');
      }

    } catch (error: any) {
      console.log('Razorpay Error:', error);

      Toast.show({
        type: 'error',
        text1: 'Payment Failed',
        text2:
          error?.description ||
          error?.message ||
          'Payment was cancelled or failed',
      });

    } finally {
      setProcessing(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <Text>Payment Screen</Text>

      <Text>Name: {auth.name}</Text>

      <InputFields
        placeholder="Enter money to send"
        onChangeText={(text) => setAmount(text)}
        value={amount}
        keyboardType="numeric"
      />

      <PrimaryButton
        title={
          processing || loading
            ? 'Processing...'
            : 'Make Payment'
        }
        onPress={handlePayment}
        loading={processing || loading}
        disabled={processing || loading}
      />
    </View>
  );
};

export default Payment;