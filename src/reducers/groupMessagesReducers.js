import { GET_ALL_GROUP_MESSAGES, ADD_NEW_MESSAGE } from '../constants'

export default (state = [], action) => {
  switch (action.type) {
    case GET_ALL_GROUP_MESSAGES:
      return action.payload;

    case ADD_NEW_MESSAGE:
      return [...state, action.payload];

    default:
      return state;
  }
}