import { SAVE_ESSENTIAL_DATA, LOAD_PRIVACY } from 'rdx/constants/actionTypes'
import { updatePrivacy, showPrivacy } from './actions'

const PRIVACY_KEY = 'acceptPrivacyPolicy'

export const privacyMiddleware = (store) => (next) => (action) => {
    switch (action.type) {
        case LOAD_PRIVACY:
            // eslint-disable-next-line no-case-declarations
            const privacy = JSON.parse(localStorage.getItem(PRIVACY_KEY))
            if (privacy) {
                store.dispatch(updatePrivacy())
            } else {
                setTimeout(() => {
                    store.dispatch(showPrivacy())
                }, 2000)
            }
            break
        case SAVE_ESSENTIAL_DATA:
            try {
                localStorage.setItem(
                    PRIVACY_KEY,
                    JSON.stringify(action.payload)
                )
            } catch (error) {
                console.error(error)
            }
            break
        default:
            break
    }
    next(action)
}
