import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { Actions } from 'react-native-router-flux';
import { USER_LOGIN_REQUESTED, USER_LOGIN_LOADING, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGOUT_REQUESTED, USER_LOGOUT_SUCCESS } from '../actions/types';
import authService from '../services/auth';

function* loginUser(action) {
  try {
    yield put({ type: USER_LOGIN_LOADING });
    const { username, password } = action.payload;
    const user = yield call(authService.authenticate, username, password);
    yield put({ type: USER_LOGIN_SUCCESS, payload: user });
  } catch (e) {
    yield put({ type: USER_LOGIN_FAILURE, payload: { error: e.message } });
  }
}

function* storeTokenAndRedirect(action) {
  yield call(authService.storeToken, action.payload);
  yield call(Actions.profile);
}

function* destroyTokenAndRedirect() {
  yield call(authService.destroyToken);
  yield call(Actions.public);
  yield put({ type: USER_LOGOUT_SUCCESS });
}

const authSaga = function* () {
  yield takeLatest(USER_LOGIN_REQUESTED, loginUser);
  yield takeLatest(USER_LOGIN_SUCCESS, storeTokenAndRedirect);
  yield takeLatest(USER_LOGOUT_REQUESTED, destroyTokenAndRedirect);
}

export default authSaga;
