import { GET_CURRENT_USER } from '../constants'

export const getCurrentUser = (user) => {
  return {
    type: GET_CURRENT_USER,
    payload: user
  }
}
