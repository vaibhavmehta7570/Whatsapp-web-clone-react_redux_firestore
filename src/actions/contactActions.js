import {GET_USERS} from "../constants";
export const getUsers=(data)=>{
    return {
        type:GET_USERS,
        data,
    };
};