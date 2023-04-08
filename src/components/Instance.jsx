import axios from 'axios';
import { getCookie } from 'components/Cookie';

const ACCESS_TOKEN = localStorage.getItem('access_token');
const REFRESH_TOKEN = getCookie('refresh_token');

export const Instance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    withCredentials: true,
  },
});

// Request Interceptor---------------------------------
Instance.interceptors.request.use(
  (config) => {
    // Request 처리
    if (ACCESS_TOKEN && REFRESH_TOKEN) {
      config.headers['Authorization'] = `Bearer ${ACCESS_TOKEN}`;
    }
    return config;
  },
  (error) => {
    // Request 에러 처리
    console.log('request interceptor >', error);
    return Promise.reject(error);
  }
);

// Response Interceptor--------------------------------
Instance.interceptors.response.use(
  (response) => {
    // Response 처리
    console.log('respone interceptor >', response);
    return response;
  },
  async (error) => {
    // Response 에러 처리
    console.log('respone interceptor >', error);
    const originalRequest = error.config;

    // 만료된 access token이면서 refresh token이 유효한 경우
    if (error.response?.status === 500) {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/login/token/refresh/',
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
        return await axios(originalRequest);
      } catch (error) {
        console.log('interceptor try catch >', error);
      }
    }
    return Promise.reject(error);
  }
);
