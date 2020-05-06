import { FETCH_ALL_MESSAGES } from "../constants";

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

    default:
      return state;
  }
};

export default chatWindowReducer;
