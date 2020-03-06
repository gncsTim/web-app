import { SET_VENUES } from 'rdx/constants/actionTypes'

export const venuesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_VENUES:
      return action.payload.map(item => {
        item.label = item.name
        return item
      })
    default:
      return state
  }
}
