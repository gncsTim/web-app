import { SET_VENUES } from 'rdx/constants/actionTypes'

export const venuesReducer = (state = [], action) => {
    switch (action.type) {
        case SET_VENUES:
            return action.payload
        default:
            return state
    }
}