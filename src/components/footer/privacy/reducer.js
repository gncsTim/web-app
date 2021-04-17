import { UPDATE_PRIVACY } from 'rdx/constants/actionTypes'

const INIT_STATE = {}

export const privacyReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case UPDATE_PRIVACY:
            return { ...state, ...action.payload }
        default:
            return state
    }
}
