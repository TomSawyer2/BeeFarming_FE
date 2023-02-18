import HeaderBar from '@/components/HeaderBar';
import React, { useCallback, useEffect, useState } from 'react';
import { UserInfo, getUserInfo } from './services/user';
import { userInfoContext } from './const/context';

const whiteListUrl = ['/login', '/register'];

// @ts-ignore
export function onRouteChange({ location }) {
  if (location.pathname === '/') {
    window.location.href = '/login';
  }
  if (!whiteListUrl.includes(location.pathname) && !window.localStorage.getItem('token')) {
    window.location.href = '/login';
  }
}

const PermissionWrapper = (props: any) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const [initialLizing, setInitialLizing] = useState<boolean>(true);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = useCallback(async () => {
    try {
      setInitialLizing(true);
      const res = await getUserInfo();
      setUserInfo(res);
    } catch (error) {
      console.error(error);
    }
    setInitialLizing(false);
  }, [localStorage.getItem('token')]);

  return (
    <userInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {!initialLizing && props.children}
    </userInfoContext.Provider>
  );
};

export function rootContainer(container: any) {
  return (
    <PermissionWrapper>
      {!whiteListUrl.includes(window.location.pathname) && <HeaderBar />}
      {container}
    </PermissionWrapper>
  );
}
