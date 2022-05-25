import { FETCH_ALL_MESSAGES, ADD_NEW_MESSAGE } from "../constants";

const initialState = {
  message: [],
};

const chatWindowReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_MESSAGES:
      return {
        ...state,
        message: action.payload,
      };
    
    case ADD_NEW_MESSAGE:
      return {
        ...state,
        message: [...state.message, action.payload]
      }

    default:
      return state;
  }
};

export default chatWindowReducer;
