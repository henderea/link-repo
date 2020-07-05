import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import urlReducer from './reducers/urlReducer';

export default function rootReducer() {
  return combineReducers({
    auth: authReducer,
    url: urlReducer
  });
}