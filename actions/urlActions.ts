import { UrlResult, UrlDataEntry } from '../types';

const TYPE_URL = 'url/TYPE_URL' as const;
const ADD_URL = 'url/ADD_URL' as const;
const ADD_URL_SUCCESS = 'url/ADD_URL_SUCCESS' as const;
const ADD_URL_ERROR = 'url/ADD_URL_ERROR' as const;
const REMOVE_URL = 'url/REMOVE_URL' as const;
const REMOVE_URL_SUCCESS = 'url/REMOVE_URL_SUCCESS' as const;
const REMOVE_URL_ERROR = 'url/REMOVE_URL_ERROR' as const;
const FETCH_URL = 'url/FETCH_URL' as const;
const DROP_URL = 'url/DROP_URL' as const;
const CLEAR_URLS = 'url/CLEAR_URLS' as const;

export const urlActionTypes = {
  TYPE_URL,
  ADD_URL,
  ADD_URL_SUCCESS,
  ADD_URL_ERROR,
  REMOVE_URL,
  REMOVE_URL_SUCCESS,
  REMOVE_URL_ERROR,
  FETCH_URL,
  DROP_URL,
  CLEAR_URLS
} as const;

export interface UrlTypeUrlAction {
  type: typeof TYPE_URL;
  url: string;
}

export interface UrlAddUrlAction {
  type: typeof ADD_URL;
}

export interface UrlAddUrlSuccessAction {
  type: typeof ADD_URL_SUCCESS;
}

export interface UrlAddUrlErrorAction {
  type: typeof ADD_URL_ERROR;
  errorMessage: string;
}

export interface UrlRemoveUrlAction {
  type: typeof REMOVE_URL;
  key: number | string;
}

export interface UrlRemoveUrlSuccessAction {
  type: typeof REMOVE_URL_SUCCESS;
}

export interface UrlRemoveUrlErrorAction {
  type: typeof REMOVE_URL_ERROR;
  errorMessage: string;
}

export interface UrlFetchUrlAction {
  type: typeof FETCH_URL;
  data: UrlDataEntry;
}

export interface UrlDropUrlAction {
  type: typeof DROP_URL;
  key: number | string;
}

export interface UrlClearUrlsAction {
  type: typeof CLEAR_URLS;
}

export type UrlAction = UrlTypeUrlAction | UrlAddUrlAction | UrlAddUrlSuccessAction | UrlAddUrlErrorAction | UrlRemoveUrlAction | UrlRemoveUrlSuccessAction | UrlRemoveUrlErrorAction | UrlFetchUrlAction | UrlDropUrlAction | UrlClearUrlsAction;

export function typeUrl(url: string): UrlTypeUrlAction {
  return {
    type: TYPE_URL,
    url
  };
}

export function addUrl(): UrlAddUrlAction {
  return {
    type: ADD_URL
  };
}

export function addUrlSuccess(): UrlAddUrlSuccessAction {
  return {
    type: ADD_URL_SUCCESS
  };
}

export function addUrlError(errorMessage: string): UrlAddUrlErrorAction {
  return {
    type: ADD_URL_ERROR,
    errorMessage
  };
}

export function removeUrl(key: number | string): UrlRemoveUrlAction {
  return {
    type: REMOVE_URL,
    key
  };
}

export function removeUrlSuccess(): UrlRemoveUrlSuccessAction {
  return {
    type: REMOVE_URL_SUCCESS
  };
}

export function removeUrlError(errorMessage: string): UrlRemoveUrlErrorAction {
  return {
    type: REMOVE_URL_ERROR,
    errorMessage
  };
}

export function fetchUrl(data: UrlResult, key: number | string): UrlFetchUrlAction {
  return {
    type: FETCH_URL,
    data: { key, ...data }
  };
}

export function dropUrl(key: number | string): UrlDropUrlAction {
  return {
    type: DROP_URL,
    key
  };
}

export function clearUrls(): UrlClearUrlsAction {
  return {
    type: CLEAR_URLS
  };
}
