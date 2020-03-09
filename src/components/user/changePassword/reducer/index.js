import { CHANGE_PASSWORD_REQUEST } from 'rdx/constants/actionTypes'

const INIT_STATE = { loading: false }

export const changePasswordRequestReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return { loading: true, error: null, success: null }
    default:
      return state
  }
}
