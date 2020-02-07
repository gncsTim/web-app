import { createAction } from 'redux-actions'
import { GET_SESSION, SET_USER_CTX, LOGOUT, RESET_USER_CTX } from 'rdx/constants/actionTypes'

export const getSession = createAction(GET_SESSION)
export const setUserCtx = createAction(SET_USER_CTX)
export const logout = createAction(LOGOUT)
export const resetUserCtx = createAction(RESET_USER_CTX)
