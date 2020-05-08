import { USER_LOGGED_IN } from '../constants'

export const userLoggedIn = (isLoggedIn) => {
  return {
    type: USER_LOGGED_IN,
    payload: isLoggedIn
  }
}