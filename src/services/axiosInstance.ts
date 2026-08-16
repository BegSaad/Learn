import axios from 'axios';
import store from '../Redux-Toolkit/store';
import { updateAccessToken, clearTokens } from '../Redux-Toolkit/AuthSlice';
import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV();

const api = axios.create({
  baseURL: 'https://learnbackened.onrender.com/api/app',
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  config => {
    // Get the latest Redux state
    const auth = store.getState().auth;

    if (auth.accessToken) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }

    return config;
  },

  error => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  response => {
    return response;
  },

  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const auth = store.getState().auth;

      if (auth.refreshToken) {
        try {
          // Get new access token
          const response = await axios.post(
            'https://learnbackened.onrender.com/api/auth/newAccessToken',
            {
              refreshToken: auth.refreshToken,
            }
          );

          const newToken = response.data.accessToken;

          // Save new token in Redux and MMKV
          store.dispatch(updateAccessToken(newToken));
          storage.set('accessToken', newToken);

          // Update header for original request
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          processQueue(null, newToken);
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          store.dispatch(clearTokens());
          storage.remove('accessToken');
          storage.remove('refreshToken');
          storage.remove('userId');
          storage.remove('name');
          storage.remove('email');
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;