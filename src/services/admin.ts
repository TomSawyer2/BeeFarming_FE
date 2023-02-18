import axios from '@/utils/axios';
import { PageParams } from './user';

export interface BanUserParams {
  userId: number;
}

// 获取所有人的对局历史记录
export async function getAdminBatchTasksHistory(params: PageParams) {
  const url = '/api/admin/batchTasks/history';

  const { data } = await axios.get(url, { params });
  return data;
}

// 获取所有人的信息
export async function getAdminUserInfo(params: PageParams) {
  const url = '/api/admin/userInfo';

  const { data } = await axios.get(url, { params });
  return data;
}

// 获取所有已经提交的代码
export async function getAdminCode(params: PageParams) {
  const url = '/api/admin/code';

  const { data } = await axios.get(url, { params });
  return data;
}

// 封禁用户
export async function banUser(params: BanUserParams) {
  const url = '/api/admin/ban';

  const { data } = await axios.post(url, params);
  return data;
}

// 解封用户
export async function unbanUser(params: BanUserParams) {
  const url = '/api/admin/unban';

  const { data } = await axios.post(url, params);
  return data;
}
