
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
const isDev = process.env.NODE_ENV == 'development';
const request = axios.create({
  baseURL: isDev ? 'http://127.0.0.1:3007' : '',
  timeout: 30000,
});
//请求拦截器
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.headers) {
      config.headers.token = sessionStorage.getItem('token') || '';
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
//响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
export default request;
