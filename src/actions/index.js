import * as types from './types';

export function loginUser(username, password) {
  return {
    type: types.USER_LOGIN_REQUESTED,
    payload: { username, password }
  };
}

export function loginUserPending() {
  return {
    type: types.USER_LOGIN_LOADING
  };
}

export function loginUserFulfilled(token) {
  return { 
    type: types.USER_LOGIN_SUCCESS, payload: token 
  };
}

export function loginUserFailed(error) {
  return { 
    type: types.USER_LOGIN_FAILURE, 
    payload: { error } 
  };
}

export function fetchUserProfile(accessToken) {
  return { 
    type: types.USER_PROFILE_REQUESTED, 
    payload: { accessToken } 
  };
}

export function fetchUserProfilePending() {
  return {
    type: types.USER_PROFILE_LOADING
  };
}

export function fetchUserProfileFulfilled(profile) {
  return { 
    type: types.USER_PROFILE_SUCCESS, 
    payload: { profile } 
  };
}

export function fetchUserProfileFailed(error) {
  return { 
    type: types.USER_PROFILE_FAILURE, 
    payload: { error } 
  };
}

export function logoutUser() {
  return {
    type: types.USER_LOGOUT_REQUESTED
  };
}

export function logoutUserFulfilled() {
  return { 
    type: types.USER_LOGOUT_SUCCESS 
  };
}
