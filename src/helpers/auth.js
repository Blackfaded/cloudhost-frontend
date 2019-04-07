import * as Cookies from 'js-cookie';
// eslint-disable-next-line
export function isLoggedIn() {
  return !!Cookies.get('jwt');
}
