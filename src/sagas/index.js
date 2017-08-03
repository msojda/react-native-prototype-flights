import { fork, all } from 'redux-saga/effects'
import authSaga from './auth';

const rootSaga = function* () {
  yield all([
    fork(authSaga),
  ]);
}

export default rootSaga;
