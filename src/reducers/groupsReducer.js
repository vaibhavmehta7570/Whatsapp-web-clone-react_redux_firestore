import { GET_ALL_GROUPS, UPDATE_A_GROUP } from '../constants'

export default (state = [], action) => {
  switch (action.type) {
    case GET_ALL_GROUPS:
      return action.payload;

    case UPDATE_A_GROUP:
      return state.map(group => {
        if (group.group_id === action.payload.group_id) {
          return action.payload;
        }
        return group;
      })

    default:
      return state;
  }
}