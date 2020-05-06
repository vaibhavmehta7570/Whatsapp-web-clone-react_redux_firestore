
import{combineReducers} from "redux";
import contactReducer from "./contactReducer";
const rootReducer=combineReducers({
    users:contactReducer,
})
export{getUsers} from "../actions/contactActions";
export{searchContacts} from "../actions/searchContacts.js"
export default rootReducer;