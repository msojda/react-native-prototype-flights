import * as actionTypes from '@flights/app/actions/types';

const initialState = {
  isLoading: false,
  error: ''
};

export const register = function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.REGISTER_USER_LOADING:
      return Object.assign({}, state, { isLoading: true, error: '' });
    case actionTypes.REGISTER_USER_SUCCESS:
      return Object.assign({}, state, { isLoading: false, error: '' });
    case actionTypes.REGISTER_USER_FAILURE:
      return Object.assign({}, state, { isLoading: false, error: action.payload.error });
  }
  return state;
}
