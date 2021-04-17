import { UPDATE_PRIVACY, SHOW_PRIVACY, SAVE_ESSENTIAL_DATA } from 'rdx/constants/actionTypes'

const INIT_STATE = {}

export const privacyReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SAVE_ESSENTIAL_DATA:
            return { ...state, showPrivacy: false }
        case UPDATE_PRIVACY:
            return { ...state, ...action.payload }
        case SHOW_PRIVACY:
            return { ...state, showPrivacy: true }
        default:
            return state
    }
}
