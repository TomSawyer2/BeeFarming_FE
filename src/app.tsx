import { history } from 'umi';
import HeaderBar from '@/components/HeaderBar';
import React from 'react';

const whiteListUrl = ['/login', '/register'];

// @ts-ignore
export function onRouteChange({ location }) {
  if (!whiteListUrl.includes(location.pathname) && !window.localStorage.getItem('token')) {
    history.push('/login');
  }
}

export function rootContainer(container: any) {
  return (
    <div>
      {!whiteListUrl.includes(window.location.pathname) && <HeaderBar />}
      {container}
    </div>
  );
}
