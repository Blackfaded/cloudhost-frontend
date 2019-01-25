import store from '@/store';

// eslint-disable-next-line
export function isLoggedIn() {
  return store.state.user.auth.token;
}
