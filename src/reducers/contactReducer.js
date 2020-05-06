import {SET_USERS} from "../constants";
const contactReducer = (state=[],action)=>{
    switch(action.type){
        case SET_USERS:
            return action.data;
        default:
            return state;
    };

}
export default contactReducer; 