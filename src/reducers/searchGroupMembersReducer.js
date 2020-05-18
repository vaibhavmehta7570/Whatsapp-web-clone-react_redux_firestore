import { GET_SEARCHED_MEMBERS, ADD_GROUP_MEMBER, REMOVE_GROUP_MEMBER } from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case GET_SEARCHED_MEMBERS:
      return action.payload;

    case ADD_GROUP_MEMBER:
      return [...state, action.payload];

    case REMOVE_GROUP_MEMBER:
      return state.filter(user => user.user_id !== action.payload.user_id);


    default:
      return state;
  }
};