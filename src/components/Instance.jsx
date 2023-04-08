import axios from 'axios';
import { getCookie, removeCookie, setCookie } from './cookie';

const ACCESS_TOKEN = localStorage.getItem('access_token');
const REFRESH_TOKEN = getCookie('refresh_token');

const Instance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

// Request Interceptor---------------------------------
Instance.interceptors.request.use(
  (config) => {
    // Request 처리 로직
    return config;
  },
  (error) => {
    // Request 에러 처리 로직
    return Promise.reject(error);
  }
);

// Response Interceptor--------------------------------
Instance.interceptors.response.use(
  (response) => {
    // Response 처리 로직
    return response;
  },
  async (error) => {
    // Response 에러 처리 로직
    const originalRequest = error.config;

    // 만료된 access token이면서 refresh token이 유효한 경우
    if (
      error.response.status === 401 &&
      error.response.data.code === 'token_not_valid' &&
      error.response.data.detall === 'Token is invalid or expired' &&
      error.response.data.class_name === 'TokenError' &&
      originalRequest._retry !== true
    ) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/token/refresh',
          {
            refresh: REFRESH_TOKEN,
          }
        );
        const newAccessToken = response.data.access;
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', newAccessToken);

        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return axios(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }
    return Promise.reject(error);
  }
);
