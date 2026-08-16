import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  name: string | null;
  email: string | null;
  userId: string | null;    
}

  const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  name:null,
  email:null,
    userId:null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        name: string;
        email: string;
        userId: string; 
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.name = action.payload.name;
      state.email = action.payload.email;
        state.userId = action.payload.userId;
    },

    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },

    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.name = null;
      state.email = null;
        state.userId = null;
    },
  },
});

export const { setToken, updateAccessToken, clearTokens } = authSlice.actions;
export default authSlice.reducer;