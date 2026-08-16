import { useState } from 'react';
import Toast from 'react-native-toast-message';
import api from '../../services/axiosInstance';

const usePaymentApi = () => {
  const [loading, setLoading] = useState(false);

  /*
   * CREATE RAZORPAY ORDER
   */
  const createOrder = async (amount: number) => {
    if (loading) {
      return null;
    }

    try {
      setLoading(true);

      const response = await api.post('/payment', {
        amount: Number(amount),
      });

      console.log('Create Order Response:', response.data);

      const orderData = response.data?.order || response.data?.data || response.data;
      const orderId = orderData?.id || orderData?.order_id;
      const key = response.data?.key || response.data?.key_id || response.data?.RAZORPAY_KEY_ID || orderData?.key || orderData?.key_id;

      // If backend explicitly returned success: false or no order ID found
      if (response.data?.success === false || (!orderId && !response.data?.order)) {
        Toast.show({
          type: 'error',
          text1: 'Order Creation Failed',
          text2: response.data?.error || response.data?.message || 'Unable to create payment order',
        });
        return null;
      }

      return {
        id: orderId,
        amount: orderData?.amount || Number(amount) * 100,
        currency: orderData?.currency || 'INR',
        key: key,
        ...orderData,
      };

    } catch (error: any) {
      console.log(
        'Create Order Error:',
        error.response?.data || error.message
      );

      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        'Something went wrong creating payment order';

      Toast.show({
        type: 'error',
        text1: 'Unable to Create Order',
        text2: typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
      });

      return null;

    } finally {
      setLoading(false);
    }
  };


  /*
   * VERIFY RAZORPAY PAYMENT
   */
  const verifyPayment = async (paymentData: any) => {
    try {
      setLoading(true);

      console.log(
        'Sending Payment For Verification:',
        paymentData
      );

      const response = await api.post(
        '/payment/verify',
        {
          razorpay_payment_id:
            paymentData.razorpay_payment_id,

          razorpay_order_id:
            paymentData.razorpay_order_id,

          razorpay_signature:
            paymentData.razorpay_signature,
        }
      );

      console.log(
        'Payment Verification Response:',
        response.data
      );

      if (!response.data?.success) {
        Toast.show({
          type: 'error',
          text1: 'Payment Verification Failed',
          text2:
            response.data?.message ||
            'Unable to verify payment',
        });

        return null;
      }

      return response.data;

    } catch (error: any) {
      console.log(
        'Payment Verification Error:',
        error.response?.data || error.message
      );

      Toast.show({
        type: 'error',
        text1: 'Payment Verification Failed',
        text2:
          error.response?.data?.message ||
          'Something went wrong while verifying payment',
      });

      return null;

    } finally {
      setLoading(false);
    }
  };


  return {
    createOrder,
    verifyPayment,
    loading,
  };
};

export default usePaymentApi;