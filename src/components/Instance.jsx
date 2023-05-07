import axios from 'axios';
import { getCookie, removeCookie } from '../Cookie';

const ACCESS_TOKEN = localStorage.getItem('access_token');
const REFRESH_TOKEN = getCookie('refresh_token');

export const Instance = axios.create({
  baseURL: 'https://callmebyyourtext.xyz',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://callmebyyourtext.xyz',
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
          'https://callmebyyourtext.xyz/token/refresh/',
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
    } else if (error.response?.status === 500) {
      alert('일시적인 서버 오류입니다. 새로고침 후 다시 시도해주세요.');
    } else {
      // localStorage.removeItem('access_token');
      // removeCookie('refresh_token');
      // navigate('/', { replace: true });
      alert('다시 로그인 후 시도해주세요.');
    }
    return Promise.reject(error);
  }
);
