import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Auth0 from 'react-native-auth0';
import { USER_LOGIN_REQUESTED, USER_LOGIN_LOADING, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE } from '../actions/types';

auth0 = new Auth0({ domain: 'msojda.eu.auth0.com', clientId: 'N0JJfL9NjbFnSwC5qqY24fNKZr2mKKzY' });

function* loginUser(action) {
  try {
    yield put({ type: USER_LOGIN_LOADING });
    const { username, password } = action.payload;
    const user = yield call([auth0.auth, 'passwordRealm'], { username, password, realm: "Username-Password-Authentication" });
    yield put({ type: USER_LOGIN_SUCCESS, payload: user });
  } catch (e) {
    yield put({ type: USER_LOGIN_FAILURE, message: e.message });
  }
}

const authSaga = function* () {
  yield takeLatest(USER_LOGIN_REQUESTED, loginUser);
}

export default authSaga;
