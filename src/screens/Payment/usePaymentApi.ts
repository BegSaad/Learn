import { useState } from 'react';
import Toast from 'react-native-toast-message';
import api from '../../services/axiosInstance';

const usePaymentApi = () => {
  const [loading, setLoading] = useState(false);

  const makePayment = async () => {
    if (loading) return;

    try {
      setLoading(true);

      // Access token is automatically added by request interceptor
      const response = await api.post('/payment');

      console.log('Payment response:', response.data);

      Toast.show({
        type: 'success',
        text1: 'Payment Successful',
        text2: response.data?.message || 'Payment completed successfully',
      });

      return response.data;
    } catch (error: any) {
      console.log(
        'Payment error:',
        error.response?.data || error.message
      );

      Toast.show({
        type: 'error',
        text1: 'Payment Failed',
        text2:
          error.response?.data?.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    makePayment,
    loading,
  };
};

export default usePaymentApi;