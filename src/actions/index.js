import { USER_LOGIN_REQUESTED } from './types';

export function loginUser(username, password) {
  return {
    type: USER_LOGIN_REQUESTED,
    payload: { username, password }
  };
}
