import { configureStore } from '@reduxjs/toolkit';

import paymentReducer from './PaymentSlice';
import authReducer from './AuthSlice';
const store = configureStore({
  reducer: {
 
     paymentReducer,
    auth: authReducer
  },
});
export default store; 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
