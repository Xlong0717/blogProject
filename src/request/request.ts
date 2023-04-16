
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { storeToRefs } from 'pinia';
import { useDialogs } from '@/store/dialog';
const isDev = process.env.NODE_ENV == 'development';
const request = axios.create({
  // baseURL: 'http://127.0.0.1:3000',
  // baseURL: 'http://xlong.tech:3000',
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 30000,
});

// 处理  类型“AxiosResponse<any, any>”上不存在属性“errorinfo”。ts(2339) 脑壳疼！关键一步。
declare module "axios" {
  interface AxiosResponse<T = any> {
    code: null;
    // 这里追加你的参数
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}



//请求拦截器
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    let store = useDialogs()
    store.SETLOADING(false);
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
    let store = useDialogs()
    if(response.data.code){
      store.SETLOADING(true);
    }
    return response.data;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
export default request;
