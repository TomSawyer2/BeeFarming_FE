import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const HTTP_STATUS_SUCCESS_CODE: Array<number> = [200];

const defaultConfig: AxiosRequestConfig = {
  timeout: 100 * 1000,
  headers: {
    'Content-type': 'application/json',
  },
  baseURL: 'https://bf.tomsawyer2.xyz',
};

interface responseData {
  data: Record<string, unknown>;
  status: number;
  msg: string;
}
const responseInterceptor = (response: AxiosResponse): responseData => {
  const { status, data } = response;
  if (!HTTP_STATUS_SUCCESS_CODE.includes(status) || data.status !== 0) {
    throw data.msg;
  }

    return data;
};
const commonErrorHander = (error: AxiosError) => {
  // @ts-ignore
  const response: AxiosResponse = error.response;
  if (response?.data?.msg) {
    throw response.data.msg;
  } else {
    throw error;
  }
};

const instance: AxiosInstance = axios.create(defaultConfig);

instance.interceptors.response.use(responseInterceptor, commonErrorHander);

export default instance;
