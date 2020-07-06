import { useDispatch, useSelector, useStore } from 'react-redux';
import { selectAuthErrorMessage, selectDisplayName, selectEmail, selectHasAuthError, selectIsConnected, selectIsInProgress, selectIsLoaded, selectIsUserSignedIn } from '../selectors/authSelectors';
import mainStyles from '../styles/main.module.scss';
import Head from 'next/head';
import { authConnect, authDisconnect, initialLoadDone, signIn, signOut } from '../actions/authActions';
import UrlList from './urlList';
import UrlInput from './urlInput';
import { useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { dropUrl, fetchUrl } from '../actions/urlActions';
import initFirebase from '../utils/firebase/initFirebase';

export default function Home() {
  const isUserSignedIn = useSelector(selectIsUserSignedIn());
  const isLoaded = useSelector(selectIsLoaded());
  const isInProgress = useSelector(selectIsInProgress());
  const hasError = useSelector(selectHasAuthError());
  const errorMessage = useSelector(selectAuthErrorMessage());
  const displayName = useSelector(selectDisplayName());
  const email = useSelector(selectEmail());
  const dispatch = useDispatch();
  const store = useStore();
  useEffect(() => {
    if(!isLoaded) {
      initFirebase();
      firebase.auth().onAuthStateChanged(async user => {
        if(user) {
          const uid = user.uid;
          const isConnected = selectIsConnected()(store.getState());
          if(!isConnected) {
            firebase.database().ref(`/urls/${uid}`).on('child_added', snap => {
              const data = snap.val();
              const key = snap.key;
              if(data) {
                dispatch(fetchUrl(data, key));
              }
            });
            firebase.database().ref(`/urls/${uid}`).on('child_removed', snap => {
              dispatch(dropUrl(snap.key));
            });
          }
          dispatch(authConnect(uid, user.displayName, user.email));
        } else {
          dispatch(authDisconnect());
        }
      });
      dispatch(initialLoadDone());
    }
  });
  return (
    <div className={mainStyles.container}>
      <Head>
        <title>Link Repo</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="360x360" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Provides users with a repository for links that shows previews of the links and syncs between devices." />
        <link rel="stylesheet" href="/font-awesome/css/fontawesome-all.min.css" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#454545" />
      </Head>

      <table className={mainStyles.mainTable}>
        <tbody>
          <tr>
            <td colSpan="2">
              {isInProgress ? (
                <div className={mainStyles.authProgressContainer}>
                  <i className="far fa-spinner-third fa-spin" />
                </div>
              ) : (isUserSignedIn ? (
                <div className={mainStyles.signedInContainer}>
                  <span className={mainStyles.signedInInfo}>Signed in as <span className={mainStyles.signedInName}>{displayName}</span> ({email})</span>
                  (<span onClick={() => dispatch(signOut())} className={mainStyles.signOutLink}>Sign Out</span>)
                  {hasError && (
                    <span className={mainStyles.errorMessage}>{errorMessage}</span>
                  )}
                </div>
              ) : (
                     <div>
                       <span onClick={() => dispatch(signIn())} className={mainStyles.signInLink}>Sign In</span>
                       {hasError && (
                         <span className={mainStyles.errorMessage}>{errorMessage}</span>
                       )}
                     </div>
                   ))}
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="url-input" className={mainStyles.urlLabel}>URL:</label>
            </td>
            <td>
              <UrlInput />
            </td>
          </tr>
          <tr>
            <td valign="top" colSpan="2">
              <UrlList />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}