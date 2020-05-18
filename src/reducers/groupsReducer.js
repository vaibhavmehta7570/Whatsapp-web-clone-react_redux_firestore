import { GET_ALL_GROUPS } from '../constants'

export default (state = [], action) => {
  switch (action.type) {
    case GET_ALL_GROUPS:
      return action.payload;

    default:
      return state;
  }
}