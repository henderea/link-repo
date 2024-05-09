import { all } from 'redux-saga/effects';
import authSaga from './sagas/authSaga';
import urlSaga from './sagas/urlSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    urlSaga()
  ]);
}
