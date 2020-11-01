import { SET_USER_CTX } from 'rdx/constants/actionTypes'

export const appUserMiddleware = () => (next) => {
    return (action) => {
        const _next = next(action)
        switch (SET_USER_CTX) {
            case action.type:                
                localStorage.setItem('gncsUser', JSON.stringify(action.payload))
                break
            default:
        }
        return _next
    }
}
