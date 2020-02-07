import { SET_USER_CTX, RESET_USER_CTX } from 'rdx/constants/actionTypes'

export const userCtxReducer = (state = null, action) => {
  switch (action.type) {
    case SET_USER_CTX:
      return action.payload
    case RESET_USER_CTX:
      return null
    default:
  }
  return state
}
