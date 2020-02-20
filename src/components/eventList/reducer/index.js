import { SET_EVENT_LIST, ADD_OR_UPDATE_EVENTS } from 'rdx/constants/actionTypes'

const initialState = []

export const eventListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENT_LIST:
      return action.payload
    case ADD_OR_UPDATE_EVENTS:
      state = [...state]
      action.payload
        .forEach(item => {
          let index = state.findIndex(obj => obj._id === item._id)
          if (index === -1 ) return state.push(item)
          state.splice(index, 1, item)
        })
      return state
    default:
      return state
  }
}
