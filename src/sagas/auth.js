import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { Actions } from 'react-native-router-flux';
import {
  USER_LOGIN_REQUESTED,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_PROFILE_REQUESTED,
  USER_PROFILE_LOADING,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILURE,
  USER_LOGOUT_REQUESTED,
  USER_LOGOUT_SUCCESS
} from '@flights/app/actions/types';
import authService from '@flights/app/services/auth';

function* loginUser(action) {
  try {
    yield put({ type: USER_LOGIN_LOADING });
    const { username, password } = action.payload;
    const token = yield call(authService.authenticate, username, password);
    yield put({ type: USER_LOGIN_SUCCESS, payload: token });
    yield put({ type: USER_PROFILE_REQUESTED, payload: { accessToken: token.accessToken } });
  } catch (e) {
    yield put({ type: USER_LOGIN_FAILURE, payload: { error: e.message } });
  }
}

function* fetchUserProfile(action) {
  try {
    yield put({ type: USER_PROFILE_LOADING });
    const { accessToken } = action.payload;
    const profile = yield call(authService.getUserProfile, accessToken);
    yield put({ type: USER_PROFILE_SUCCESS, payload: { profile } });
  } catch (e) {
    yield put({ type: USER_PROFILE_FAILURE, payload: { error: e.message } });
  }
}

function* storeTokenAndRedirect(action) {
  yield call(authService.storeToken, action.payload);
  yield call(Actions.profile);
}

function* destroyTokenAndRedirect() {
  yield call(authService.destroyTokenAndRevoke);
  yield call(Actions.public);
  yield put({ type: USER_LOGOUT_SUCCESS });
}

const authSaga = function* () {
  yield takeLatest(USER_LOGIN_REQUESTED, loginUser);
  yield takeLatest(USER_LOGIN_SUCCESS, storeTokenAndRedirect);
  yield takeLatest(USER_LOGOUT_REQUESTED, destroyTokenAndRedirect);
  yield takeLatest(USER_PROFILE_REQUESTED, fetchUserProfile);
}

export default authSaga;
