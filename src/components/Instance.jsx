import axios from 'axios';
import { getCookie, removeCookie } from 'components/Cookie';

const ACCESS_TOKEN = localStorage.getItem('access_token');
const REFRESH_TOKEN = getCookie('refresh_token');

export const Instance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8000',
    // 'Access-Control-Allow-Headers': '*',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    // withCredentials: true,
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
    console.log('request interceptor 에러', error);
    return Promise.reject(error);
  }
);

// Response Interceptor--------------------------------
Instance.interceptors.response.use(
  (response) => {
    // Response 처리
    console.log('respone interceptor 응답', response);
    return response;
  },
  async (error) => {
    // Response 에러 처리
    console.log('respone interceptor 에러', error);
    const originalRequest = error.config;

    // 만료된 access token이면서 refresh token이 유효한 경우
    if (
      error.response?.status === 401 &&
      error.response?.statusText === 'Unauthorized'
      // && error.response?.data.detail === 'Token expired'
    ) {
      try {
        const reIssue = await axios.post(
          'http://127.0.0.1:8000/token/refresh/',
          {
            refresh: REFRESH_TOKEN,
          }
        );
        const newAccessToken = reIssue.data.access;
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
    } else {
      // localStorage.removeItem('access_token');
      // removeCookie('refresh_token');
      // navigate('/', { replace: true });
      alert('다시 로그인 후 시도해주세요.');
    }
    return Promise.reject(error);
  }
);
