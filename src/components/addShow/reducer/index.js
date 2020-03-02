import {
  ADD_EVENT,
  ADD_EVENT_REMOTE,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_ERROR,
  REST_ADD_EVENT_REQUEST
} from 'rdx/constants/actionTypes'

const INIT_STATE = {
  loading: false
}

export const addShowRequestReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case REST_ADD_EVENT_REQUEST:
      return INIT_STATE
    case ADD_EVENT:
    case ADD_EVENT_REMOTE:
      return { loading: true }
    case ADD_EVENT_SUCCESS:
      return { loading: false, success: action.payload }
    case ADD_EVENT_ERROR:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
