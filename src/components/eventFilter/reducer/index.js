import { SET_GENRES_FILTER, SET_REGIONS_FILTER } from 'rdx/constants/actionTypes'

const INIT_STATE = {}

export const eventFilterReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_GENRES_FILTER:
            state = JSON.parse(JSON.stringify(state))

            if (action.payload.length === 0) {
                delete state.genres
            } else {
                state.genres = action.payload
            }
            return state
        case SET_REGIONS_FILTER:
            state = JSON.parse(JSON.stringify(state))

            if (action.payload.length === 0) {
                delete state.regions
            } else {
                state.regions = action.payload
            }
            return state
        default:
    }
    return state
}
