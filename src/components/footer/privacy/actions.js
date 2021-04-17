import { createAction } from 'redux-actions'
import { SAVE_ESSENTIAL_DATA, LOAD_PRIVACY, UPDATE_PRIVACY } from 'rdx/constants/actionTypes'

export const loadPrivacy = createAction(LOAD_PRIVACY)
export const updatePrivacy = createAction(UPDATE_PRIVACY)
export const saveEssentialData = createAction(SAVE_ESSENTIAL_DATA, () => ({acceptPrivacyPolicy: true}))
