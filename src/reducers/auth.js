import { USER_LOGIN_LOADING, USER_LOGIN_FAILURE, USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  error: ''
};

export const auth = function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_LOADING:
      return Object.assign({}, state, { isLoading: true, error: '' });
    case USER_LOGIN_SUCCESS:
      return Object.assign({}, state, { isLoading: false, isAuthenticated: true });
    case USER_LOGIN_FAILURE:
      return Object.assign({}, state, { isLoading: false, error: action.payload.error });
    case USER_LOGOUT_SUCCESS:
      return Object.assign({}, state, { isAuthenticated: false });
  }
  return state;
}
