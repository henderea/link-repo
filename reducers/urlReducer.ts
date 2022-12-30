import { UrlAction, urlActionTypes as actionTypes, UrlAddUrlErrorAction, UrlDropUrlAction, UrlFetchUrlAction, UrlRemoveUrlAction, UrlRemoveUrlErrorAction, UrlTypeUrlAction } from '../actions/urlActions';
import { UrlDataEntry } from '../types';
import { HYDRATE } from 'next-redux-wrapper';

export interface UrlState {
  typedUrl: string;
  isAdding: boolean;
  isRemoving: boolean;
  hasError: boolean;
  errorMessage: string;
  urlData: Array<UrlDataEntry>;
  keyToRemove: number | string | null;
}

export const INITIAL_STATE: UrlState = {
  typedUrl: '',
  isAdding: false,
  isRemoving: false,
  hasError: false,
  errorMessage: '',
  urlData: [],
  keyToRemove: null
};

export default function urlReducer(state: UrlState = INITIAL_STATE, action: UrlAction | { type: typeof HYDRATE }): UrlState {
  switch(action.type) {
    case HYDRATE: {
      return { ...state };
    }
    case actionTypes.TYPE_URL: {
      const { url } = (action as UrlTypeUrlAction);
      return {
        ...state,
        typedUrl: url
      };
    }
    case actionTypes.ADD_URL: {
      return {
        ...state,
        isAdding: true
      };
    }
    case actionTypes.ADD_URL_SUCCESS: {
      return {
        ...state,
        typedUrl: '',
        isAdding: false,
        hasError: false,
        errorMessage: ''
      };
    }
    case actionTypes.ADD_URL_ERROR: {
      const { errorMessage } = (action as UrlAddUrlErrorAction);
      return {
        ...state,
        isAdding: false,
        hasError: true,
        errorMessage
      };
    }
    case actionTypes.REMOVE_URL: {
      const { key } = (action as UrlRemoveUrlAction);
      return {
        ...state,
        isRemoving: true,
        keyToRemove: key
      };
    }
    case actionTypes.REMOVE_URL_SUCCESS: {
      return {
        ...state,
        isRemoving: false,
        hasError: false,
        errorMessage: '',
        keyToRemove: null
      };
    }
    case actionTypes.REMOVE_URL_ERROR: {
      const { errorMessage } = (action as UrlRemoveUrlErrorAction);
      return {
        ...state,
        isRemoving: false,
        hasError: false,
        errorMessage
      };
    }
    case actionTypes.FETCH_URL: {
      const { data } = (action as UrlFetchUrlAction);
      return {
        ...state,
        urlData: [data, ...state.urlData]
      };
    }
    case actionTypes.DROP_URL: {
      const { key } = (action as UrlDropUrlAction);
      return {
        ...state,
        urlData: state.urlData.filter(d => d.key !== key)
      };
    }
    case actionTypes.CLEAR_URLS: {
      return {
        ...state,
        typedUrl: '',
        urlData: [],
        keyToRemove: null
      };
    }
    default:
      return state;
  }
}