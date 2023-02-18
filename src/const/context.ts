import { UserInfo } from '@/services/user';
import { createContext } from 'react';

export const userInfoContext = createContext<UserInfoContextProps>({} as UserInfoContextProps);
export interface UserInfoContextProps {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}
