
import{combineReducers} from "redux";
import contactReducer from "./contactReducer";
const rootReducer=combineReducers({
    user:contactReducer,
})
export{setUsers} from "../actions/contactActions";
export default rootReducer;