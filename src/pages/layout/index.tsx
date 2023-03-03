/* eslint-disable react/display-name */
import React, { useCallback, useEffect, useState } from 'react';
import { UserInfo, getUserInfo } from '@/services/user';
import { userInfoContext } from '@/const/context';
import HeaderBar from '@/components/HeaderBar';

const whiteListUrl = ['/login', '/register'];

export default (props: any) => {
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
      {!initialLizing ? (
        <div style={{ background: 'white' }}>
          {!whiteListUrl.includes(window.location.pathname) && <HeaderBar />}
          {props.children}
        </div>
      ) : null}
    </userInfoContext.Provider>
  );
};
