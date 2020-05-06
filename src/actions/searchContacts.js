import {SEARCH_CONTACTS} from "../constants";
export const searchContacts=(data)=>{
    return {
        type:SEARCH_CONTACTS,
        data,
    };
};