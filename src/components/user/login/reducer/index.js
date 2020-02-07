import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAILD,
  LOGIN_REQUEST_SUCCESS
} from 'rdx/constants/actionTypes'

const INIT_STATE = {
  loading: false,
  error: null,
  success: null
}

export const loginStateReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { success: null, loading: false, error: null }
    case LOGIN_REQUEST_SUCCESS:
      return { success: action.payload, loading: false, error: null }
    case LOGIN_REQUEST_FAILD:
      return { success: null, loading: false, error: action.payload }
    default:
  }
  return state
}
