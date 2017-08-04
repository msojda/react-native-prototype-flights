import { 
  USER_LOGIN_LOADING, 
  USER_LOGIN_FAILURE, 
  USER_LOGIN_SUCCESS, 
  USER_LOGOUT_SUCCESS, 
  USER_PROFILE_SUCCESS,
  USER_PROFILE_LOADING
} from '@flights/app/actions/types';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  error: '',
  profile: {
    isLoading: false
  }
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
    case USER_PROFILE_LOADING:
      return Object.assign({}, state, { profile: { isLoading: true } });
    case USER_PROFILE_SUCCESS:
      return Object.assign({}, state, { profile: { isLoading: false, ...action.payload.profile } });
  }
  return state;
}
