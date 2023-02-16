import { history } from 'umi';

const whiteListUrl = ['/login', '/register'];

// @ts-ignore
export function onRouteChange({ location }) {
  if (!whiteListUrl.includes(location.pathname) && !window.localStorage.getItem('token')) {
    history.push('/login');
  }
}
