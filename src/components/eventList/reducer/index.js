import {FETCH_EVENTS} from 'rdx/constants/actionTypes'

const initialState = []

export const eventListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EVENTS:
          return action.payload
        default:
          return state
      }
}