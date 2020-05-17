import { GET_GROUP_MEMBERS, GET_GROUP_ADMIN, GET_GROUP_NAME, GET_GROUP_PIC } from "../constants"

const initialState = {
  members: [],
  membersIdArray: [],
  admins: [],
  groupName: "",
  group_pic: "",

}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUP_ADMIN:
      return {
        ...initialState,
        admins: [action.payload.user_id],
        members: [action.payload],
        membersIdArray: [action.payload.user_id]
      };

    case GET_GROUP_MEMBERS:
      return {
        ...state,
        members: [...state.members, ...action.payload.groupMembers],
        membersIdArray: [...state.membersIdArray, ...action.payload.membersIdArray]
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