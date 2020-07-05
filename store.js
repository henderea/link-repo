import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';

import rootReducer from './reducer';
import rootSaga from './saga';
import { INITIAL_STATE as AUTH_INITIAL_STATE } from './reducers/authReducer';
import { INITIAL_STATE as URL_INITIAL_STATE } from './reducers/urlReducer';

const bindMiddleware = middleware => {
  if(process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const initialState = {
  auth: AUTH_INITIAL_STATE,
  url: URL_INITIAL_STATE
};

export const makeStore = (_) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer(), initialState, bindMiddleware([sagaMiddleware]));

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });