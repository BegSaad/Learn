import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import paymentReducer from './PaymentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
