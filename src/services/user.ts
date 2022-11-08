import axios from '@/utils/axios';

export interface RegisterParams {
  username: string;
  password: string;
}

export type LoginParams = RegisterParams;

// 注册
export async function register(params: RegisterParams) {
  const url = '/api/register';

  const { data } = await axios.post(url, params);
  return data;
}

// 登录
export async function login(params: LoginParams) {
  const url = '/api/login';

  const { data } = await axios.post(url, params);
  return data;
}
