import { SET_OWNE_REQUEST, ADD_EVENT } from 'rdx/constants/actionTypes'

export const owneRequestIdsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_OWNE_REQUEST:
      return action.payload
    case ADD_EVENT:
      return state.concat(action.payload._id)
    default:
      return state
  }
}
