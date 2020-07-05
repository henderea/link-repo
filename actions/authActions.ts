const SIGNIN = 'auth/SIGNIN' as const;
const SIGNIN_SUCCESS = 'auth/SIGNIN_SUCCESS' as const;
const SIGNIN_ERROR = 'auth/SIGNIN_ERROR' as const;
const SIGNOUT = 'auth/SIGNOUT' as const;
const SIGNOUT_SUCCESS = 'auth/SIGNOUT_SUCCESS' as const;
const SIGNOUT_ERROR = 'auth/SIGNOUT_ERROR' as const;
const INITIAL_LOAD_DONE = 'auth/INITIAL_LOAD_DONE' as const;
const CONNECT = 'auth/CONNECT' as const;
const DISCONNECT = 'auth/DISCONNECT' as const;
const DISCONNECT_DONE = 'auth/DISCONNECT_DONE' as const;

export const authActionTypes = {
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNOUT,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  INITIAL_LOAD_DONE,
  CONNECT,
  DISCONNECT,
  DISCONNECT_DONE
} as const;

export interface AuthSignInAction {
  type: typeof SIGNIN;
}

export interface AuthSignInSuccessAction {
  type: typeof SIGNIN_SUCCESS;
  uid: string;
  displayName: string;
  email: string;
}

export interface AuthSignInErrorAction {
  type: typeof SIGNIN_ERROR;
  errorMessage: string;
}

export function signIn(): AuthSignInAction {
  return {
    type: SIGNIN
  };
}

export interface AuthSignOutAction {
  type: typeof SIGNOUT;
}

export interface AuthSignOutSuccessAction {
  type: typeof SIGNOUT_SUCCESS;
}

export interface AuthSignOutErrorAction {
  type: typeof SIGNOUT_ERROR;
  errorMessage: string;
}

export interface AuthInitialLoadDoneAction {
  type: typeof INITIAL_LOAD_DONE;
}

export interface AuthConnectAction {
  type: typeof CONNECT;
  uid: string;
  displayName: string;
  email: string;
}

export interface AuthDisconnectAction {
  type: typeof DISCONNECT;
}

export interface AuthDisconnectDoneAction {
  type: typeof DISCONNECT_DONE;
}

export type AuthAction = AuthSignInAction | AuthSignInSuccessAction | AuthSignInErrorAction | AuthSignOutAction | AuthSignOutSuccessAction | AuthSignOutErrorAction | AuthInitialLoadDoneAction | AuthConnectAction | AuthDisconnectAction | AuthDisconnectDoneAction;

export function signInSuccess(uid: string, displayName: string, email: string): AuthSignInSuccessAction {
  return {
    type: SIGNIN_SUCCESS,
    uid,
    displayName,
    email
  };
}

export function signInError(errorMessage: string): AuthSignInErrorAction {
  return {
    type: SIGNIN_ERROR,
    errorMessage
  };
}

export function signOut(): AuthSignOutAction {
  return {
    type: SIGNOUT
  };
}

export function signOutSuccess(): AuthSignOutSuccessAction {
  return {
    type: SIGNOUT_SUCCESS
  };
}

export function signOutError(errorMessage: string): AuthSignOutErrorAction {
  return {
    type: SIGNOUT_ERROR,
    errorMessage
  };
}

export function initialLoadDone(): AuthInitialLoadDoneAction {
  return {
    type: INITIAL_LOAD_DONE
  };
}

export function authConnect(uid: string, displayName: string, email: string): AuthConnectAction {
  return {
    type: CONNECT,
    uid,
    displayName,
    email
  };
}

export function authDisconnect(): AuthDisconnectAction {
  return {
    type: DISCONNECT
  };
}

export function authDisconnectDone(): AuthDisconnectDoneAction {
  return {
    type: DISCONNECT_DONE
  };
}