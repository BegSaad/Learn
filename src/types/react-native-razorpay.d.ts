declare module 'react-native-razorpay' {
  export interface RazorpayOptions {
    key: string;
    amount: number | string;
    currency: string;
    name?: string;
    description?: string;
    order_id?: string;

    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };

    notes?: {
      [key: string]: string;
    };

    theme?: {
      color?: string;
    };

    image?: string;

    modal?: {
      confirm_close?: boolean;
      animation?: boolean;
      backdropclose?: boolean;
      escape?: boolean;
    };
  }

  export interface RazorpaySuccessResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }

  export interface RazorpayErrorResponse {
    code?: number;
    description?: string;
    reason?: string;
    source?: string;
    step?: string;
  }

  const RazorpayCheckout: {
    open(
      options: RazorpayOptions
    ): Promise<RazorpaySuccessResponse>;
  };

  export default RazorpayCheckout;
}