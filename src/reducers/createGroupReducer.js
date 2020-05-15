import { GET_GROUP_MEMBERS, GET_GROUP_ADMIN, GET_GROUP_NAME, GET_GROUP_PIC } from "../constants"

const initialState = {
  members: [],
  admins: [],
  groupName: "",
  group_pic: "",

}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUP_ADMIN:
      return {
        ...state,
        admins: [...state.admins,action.payload],
        members: [...state.members, action.payload],
      };

    case GET_GROUP_MEMBERS:
      return {
        ...state,
        members: [...state.members, ...action.payload]
      };

    case GET_GROUP_NAME:
      return {
        ...state,
        groupName: action.payload
      };

    case GET_GROUP_PIC:
      return {
        ...state,
        group_pic: action.payload
      };
  
    default:
      return state
  }
}