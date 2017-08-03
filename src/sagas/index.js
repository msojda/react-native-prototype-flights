import { fork } from 'redux-saga/effects'
import authSaga from './auth';

const rootSaga = function* () {
  yield [
    fork(authSaga),
  ];
}

export default rootSaga;
