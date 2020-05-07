import { combineReducers } from 'redux';
import chatWindowReducer from "./chatWindowReducers";
import contactReducer from './contactReducer';
const rootReducer = combineReducers({
	users: contactReducer,
  chats: chatWindowReducer,
});
export default rootReducer;
