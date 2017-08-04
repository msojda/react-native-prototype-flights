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
  yield call(authService.storeToken, action.payload);
  yield call(RouterActions.profile);
}

function* destroyTokenAndRedirect() {
  yield call(authService.destroyTokenAndRevoke);
  yield call(RouterActions.public);
  yield put(actions.logoutUserFulfilled());
}

const authSaga = function* () {
  yield takeLatest(types.USER_LOGIN_REQUESTED, loginUser);
  yield takeLatest(types.USER_LOGIN_SUCCESS, storeTokenAndRedirect);
  yield takeLatest(types.USER_LOGOUT_REQUESTED, destroyTokenAndRedirect);
  yield takeLatest(types.USER_PROFILE_REQUESTED, fetchUserProfile);
}

export default authSaga;
