import { combineReducers } from 'redux';
import chatWindowReducer from "./chatWindowReducers";
import contactReducer from './contactReducer';
import currentUser from './currentUserReducer';
import auth from './authReducer';
import groupInfo from './createGroupReducer';

const rootReducer = combineReducers({
  users: contactReducer,
  chats: chatWindowReducer,
  currentUser,
  auth,
  groupInfo,
});

export default rootReducer;
