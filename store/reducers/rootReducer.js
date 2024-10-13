// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import contactReducer from './contactReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  contact: contactReducer,
});

export default rootReducer;
