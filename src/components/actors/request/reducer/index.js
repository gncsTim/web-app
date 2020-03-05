import { SET_OWN_REQUEST, ADD_EVENT } from 'rdx/constants/actionTypes'

export const ownRequestIdsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_OWN_REQUEST:
      return action.payload
    case ADD_EVENT:
      return state.concat(action.payload._id)
    default:
      return state
  }
}
