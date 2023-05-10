import axios from 'axios';
import { getCookie, removeCookie } from '../Cookie';

let ACCESS_TOKEN = localStorage.getItem('access_token');
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
    // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzNjU0MzM2LCJpYXQiOjE2ODM2NTQyNzYsImp0aSI6IjlmYTUwZjU4MWRmMjQ5NThiNjRjMzc2ZDgyZjQzZDdhIiwidXNlcl9pZCI6IjIwMjM1NzE5NDAzNDY5Mzg0OCJ9.WccrAIoSA8xU2wSWcREifq8Mj6YMUtWKxwHvMvLj5Bk
    // 만료된 access token이면서 refresh token이 유효한 경우
    if (error.response?.status === 401) {
      try {
        const reIssue = await axios.post(
          'https://callmebyyourtext.xyz/login/token/refresh/',
          {
            refresh: REFRESH_TOKEN,
          }
        );
        ACCESS_TOKEN = reIssue.data.access_token;
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', ACCESS_TOKEN);
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${ACCESS_TOKEN}`;
        originalRequest.headers['Authorization'] = `Bearer ${ACCESS_TOKEN}`;
        return await axios(originalRequest);
      } catch (error) {
        console.log('interceptor try catch >', error);
        if (
          error.response.data.detail === 'Refresh token has expired.' ||
          error.response.data.code === 'token_not_valid'
        ) {
          // console.clear();
          // localStorage.clear();
          // removeCookie('refresh_token');
          alert('세션이 만료되었습니다. 다시 로그인 후 이용해주세요.');
          // window.location.replace('/');
        } else return;
      }
    } else if (error.response?.status === 500) {
      alert('일시적인 서버 오류입니다. 새로고침 후 다시 시도해주세요.');
    } else {
      console.clear();
      localStorage.clear();
      removeCookie('refresh_token');
      alert('다시 로그인 후 시도해주세요.');
      window.location.replace('/');
    }
    return Promise.reject(error);
  }
);
