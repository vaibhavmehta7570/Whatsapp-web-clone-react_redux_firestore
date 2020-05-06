import {SET_USERS} from "../constants";
export const setUsers=(data)=>{
    return {
        type:SET_USERS,
        data,
    };
};