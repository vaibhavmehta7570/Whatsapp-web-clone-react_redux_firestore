import chatWindowReducer from "./chatWindowReducers";
import { combineReducers } from "redux";

export default combineReducers({
  chats: chatWindowReducer,
});
