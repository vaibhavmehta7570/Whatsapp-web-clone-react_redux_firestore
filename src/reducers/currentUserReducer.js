import { GET_CURRENT_USER } from '../constants'

export default (state = null, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return action.payload
      
    default:
      return state
  }
}