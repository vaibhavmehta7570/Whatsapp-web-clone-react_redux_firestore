import { USER_LOGGED_IN } from '../constants'

export default (state = null, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.payload;
    
    default:
      return state
  }
}