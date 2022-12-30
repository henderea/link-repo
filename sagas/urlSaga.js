import { all, put, takeLatest, select } from 'redux-saga/effects';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

import { urlActionTypes as actionTypes, addUrlSuccess, addUrlError, removeUrlSuccess, removeUrlError } from '../actions/urlActions';
import { selectUid } from '../selectors/authSelectors';
import { selectKeyToRemove, selectTypedUrl } from '../selectors/urlSelectors';

function* addUrlProcess() {
  try {
    const uid = yield select(selectUid());
    const typedUrl = yield select(selectTypedUrl());
    if(typedUrl.length > 0) {
      const metadata = yield fetch(`/api/metascraper?url=${encodeURIComponent(typedUrl)}`, { method: 'GET' }).then(res => res.json());
      const {description, title, url, image, logo} = metadata;
      yield firebase.database().ref(`urls/${uid}`).push({
        description,
        title,
        url,
        image,
        logo,
        addedAt: firebase.database.ServerValue.TIMESTAMP
      });
    }
    yield put(addUrlSuccess());
  } catch(e) {
    console.error(e);
    yield put(addUrlError(e));
  }
}

function* removeUrlProcess() {
  try {
    const uid = yield select(selectUid());
    const keyToRemove = yield select(selectKeyToRemove());
    if(keyToRemove) {
      yield firebase.database().ref(`urls/${uid}/${keyToRemove}`).remove();
    }
    yield put(removeUrlSuccess());
  } catch(e) {
    console.error(e);
    yield put(removeUrlError(e));
  }
}

export default function* urlSaga() {
  yield all([
    takeLatest(actionTypes.ADD_URL, addUrlProcess),
    takeLatest(actionTypes.REMOVE_URL, removeUrlProcess)
  ]);
}