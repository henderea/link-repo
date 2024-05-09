import { all, put, takeLatest, select } from 'redux-saga/effects';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

import { authActionTypes as actionTypes, signInSuccess, signInError, signOutSuccess, signOutError, authDisconnectDone } from '../actions/authActions';
import { selectIsConnected, selectUid } from '../selectors/authSelectors';
import { clearUrls } from '../actions/urlActions';

function* signInProcess() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  try {
    // if('standalone' in window.navigator && window.navigator.standalone) {
    //   yield firebase.auth().signInWithRedirect(provider);
    //   return;
    // }
    const result = yield firebase.auth().signInWithPopup(provider);
    const { user: { uid, displayName, email } } = result;
    yield firebase.database().ref(`users/${uid}`).set({
      uid,
      displayName,
      email
    });
    yield put(signInSuccess(uid, displayName, email));
  } catch (e) {
    console.error(e);
    yield put(signInError(e.message || String(e)));
  }
}

function* signOutProcess() {
  try {
    yield firebase.auth().signOut();
    yield put(clearUrls());
    yield put(signOutSuccess());
  } catch (e) {
    console.error(e);
    yield put(signOutError(e.message || String(e)));
  }
}

function* disconnectProcess() {
  const isConnected = yield select(selectIsConnected());
  if(isConnected) {
    const uid = yield select(selectUid());
    if(uid && uid.length > 0) {
      firebase.database().ref(`/urls/${uid}`).off();
    }
    yield put(signOutSuccess());
    yield put(authDisconnectDone());
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(actionTypes.SIGNIN, signInProcess),
    takeLatest(actionTypes.SIGNOUT, signOutProcess),
    takeLatest(actionTypes.DISCONNECT, disconnectProcess)
  ]);
}
