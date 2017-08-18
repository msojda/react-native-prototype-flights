import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { Actions as RouterActions } from 'react-native-router-flux';
import * as actions from '@flights/app/actions';
import * as types from '@flights/app/actions/types';
import authService from '@flights/app/services/auth';

function* loginUser(action) {
  try {
    yield put(actions.loginUserPending());

    const { username, password } = action.payload;
    const token = yield call(authService.authenticate, username, password);

    yield put(actions.loginUserFulfilled(token));
    yield put(actions.fetchUserProfile(token.accessToken));
  } catch (e) {
    yield put(actions.loginUserFailed(e.message));
  }
}

function* fetchUserProfile(action) {
  try {
    yield put(actions.fetchUserProfilePending());

    const { accessToken } = action.payload;
    const profile = yield call(authService.getUserProfile, accessToken);

    yield put(actions.fetchUserProfileFulfilled(profile));
  } catch (e) {
    yield put(actions.fetchUserProfileFailed(e.message));
  }
}

function* storeTokenAndRedirect(action) {
  const { accessToken, refreshToken } = action.payload;
  yield call(authService.storeAccessToken, accessToken);
  yield call(authService.storeRefreshToken, refreshToken);
  yield call(RouterActions.profile);
}

function* destroyTokenAndRedirect() {
  yield call(authService.destroyTokenAndRevoke);
  yield call(RouterActions.public);
  yield put(actions.logoutUserFulfilled());
}

function* registerUser(action) {
  try {
    yield put(actions.registerUserPending());

    const { username, password, email } = action.payload;
    const token = yield call(authService.register, username, password, email);

    yield put(actions.registerUserFulfilled());
    yield call(RouterActions.registrationComplete);
  } catch (e) {
    yield put(actions.registerUserFailed(e.message));
  }
}

const authSaga = function* () {
  yield takeLatest(types.USER_LOGIN_REQUESTED, loginUser);
  yield takeLatest(types.USER_LOGIN_SUCCESS, storeTokenAndRedirect);
  yield takeLatest(types.USER_LOGOUT_REQUESTED, destroyTokenAndRedirect);
  yield takeLatest(types.USER_PROFILE_REQUESTED, fetchUserProfile);
  yield takeLatest(types.REGISTER_USER_REQUESTED, registerUser);
}

export default authSaga;
