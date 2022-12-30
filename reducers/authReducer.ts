import { AuthAction, authActionTypes as actionTypes, AuthConnectAction, AuthSignInErrorAction, AuthSignInSuccessAction, AuthSignOutErrorAction } from '../actions/authActions';
import { HYDRATE } from 'next-redux-wrapper';

export interface AuthState {
  isLoaded: boolean;
  isConnected: boolean;
  isUserSignedIn: boolean;
  isInProgress: boolean;
  hasError: boolean;
  errorMessage: string;
  uid: string;
  displayName: string;
  email: string;
}

export const INITIAL_STATE: AuthState = {
  isLoaded: false,
  isConnected: false,
  isUserSignedIn: false,
  isInProgress: true,
  hasError: false,
  errorMessage: '',
  uid: '',
  displayName: '',
  email: ''
};

export default function authReducer(state: AuthState = INITIAL_STATE, action: AuthAction | { type: typeof HYDRATE }): AuthState {
  switch(action.type) {
    case HYDRATE: {
      return { ...state };
    }
    case actionTypes.SIGNIN: {
      return {
        ...state,
        isInProgress: true
      };
    }
    case actionTypes.SIGNIN_SUCCESS: {
      const { uid, displayName, email } = (action as AuthSignInSuccessAction);
      return {
        ...state,
        isUserSignedIn: true,
        isInProgress: false,
        hasError: false,
        errorMessage: '',
        uid,
        displayName,
        email
      };
    }
    case actionTypes.SIGNIN_ERROR: {
      const { errorMessage } = (action as AuthSignInErrorAction);
      return {
        ...state,
        hasError: true,
        errorMessage
      };
    }
    case actionTypes.SIGNOUT: {
      return {
        ...state,
        isInProgress: true
      };
    }
    case actionTypes.SIGNOUT_SUCCESS: {
      return {
        ...state,
        isUserSignedIn: false,
        isInProgress: false,
        hasError: false,
        errorMessage: '',
        uid: '',
        displayName: '',
        email: ''
      };
    }
    case actionTypes.SIGNOUT_ERROR: {
      const { errorMessage } = (action as AuthSignOutErrorAction);
      return {
        ...state,
        hasError: false,
        errorMessage
      };
    }
    case actionTypes.INITIAL_LOAD_DONE: {
      return {
        ...state,
        isLoaded: true
      };
    }
    case actionTypes.CONNECT: {
      const { uid, displayName, email } = (action as AuthConnectAction);
      return {
        ...state,
        isConnected: true,
        isUserSignedIn: true,
        isInProgress: false,
        hasError: false,
        errorMessage: '',
        uid,
        displayName,
        email
      };
    }
    case actionTypes.DISCONNECT: {
      return {
        ...state,
        isInProgress: false
      };
    }
    case actionTypes.DISCONNECT_DONE: {
      return {
        ...state,
        isConnected: false
      };
    }
    default:
      return state;
  }
}