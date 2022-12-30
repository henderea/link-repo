import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';

import rootReducer from './reducer';
import rootSaga from './saga';
import { INITIAL_STATE as AUTH_INITIAL_STATE } from './reducers/authReducer';
import { INITIAL_STATE as URL_INITIAL_STATE } from './reducers/urlReducer';

const initialState = {
  auth: AUTH_INITIAL_STATE,
  url: URL_INITIAL_STATE
};

export const makeStore = (_) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({ reducer: rootReducer(), preloadedState: initialState, devTools: process.env.NODE_ENV !== 'production', middleware: [sagaMiddleware] });

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: process.env.NODE_ENV === 'development' });
