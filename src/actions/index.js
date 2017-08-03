import { USER_LOGIN_REQUESTED, USER_LOGOUT_REQUESTED } from './types';

export function loginUser(username, password) {
  return {
    type: USER_LOGIN_REQUESTED,
    payload: { username, password }
  };
}

export function logoutUser() {
  return {
    type: USER_LOGOUT_REQUESTED
  };
}
