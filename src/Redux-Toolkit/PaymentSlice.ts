import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paymentStatus: 'idle',
};

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
  },
});

export const { setPaymentStatus } = paymentSlice.actions;
export default paymentSlice.reducer;
