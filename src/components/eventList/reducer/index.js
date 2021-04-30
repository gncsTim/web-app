import {
    SET_EVENT_LIST,
    ADD_OR_UPDATE_EVENTS,
    FETCH_LOAD_REQUESTED_SHOWS,
} from 'rdx/constants/actionTypes'
import { sortEventList } from '../utils'
const initialState = []

export const eventListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EVENT_LIST:
            return action.payload.sort(sortEventList())
        case ADD_OR_UPDATE_EVENTS:
            state = JSON.parse(JSON.stringify(state))
            action.payload.forEach((item) => {
                let index = state.findIndex((obj) => obj._id === item._id)
                if (index === -1) return state.push(item)
                state.splice(index, 1, item)
            })
            state.sort(sortEventList())
            return state
        default:
            return state
    }
}

const REQUESTET_SHOW_INIT = {}

export const eventRequestetShowsReducer = (
    state = REQUESTET_SHOW_INIT,
    action
) => {
    switch (action.type) {
        case FETCH_LOAD_REQUESTED_SHOWS:
            return action.payload
        default:
            return state
    }
}
