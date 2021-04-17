import { SAVE_ESSENTIAL_DATA, LOAD_PRIVACY } from 'rdx/constants/actionTypes'
import { updatePrivacy } from './actions'

const PRIVACY_KEY = 'acceptPrivacyPolicy'

export const privacyMiddleware = (store) => (next) => (action) => {
    switch (action.type) {
        case LOAD_PRIVACY:
            console.log(localStorage)
            console.log(localStorage.getItem(PRIVACY_KEY))
            store.dispatch(
                updatePrivacy(JSON.parse(localStorage.getItem(PRIVACY_KEY)))
            )
            break
        case SAVE_ESSENTIAL_DATA:
            try {
                console.log(action.payload)
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
