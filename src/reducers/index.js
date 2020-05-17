import { combineReducers } from 'redux';
import chatWindowReducer from "./chatWindowReducers";
import contactReducer from './contactReducer';
import currentUser from './currentUserReducer';
import auth from './authReducer';
import groupInfo from './createGroupReducer';
import groups from './groupsReducer'
import groupMessages from './groupMessagesReducers'

const rootReducer = combineReducers({
  users: contactReducer,
  chats: chatWindowReducer,
  currentUser,
  auth,
  groupInfo,
  groups,
  groupMessages,
});

export default rootReducer;
