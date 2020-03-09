import { createAction } from 'redux-actions'

import { CHANGE_PASSWORD_REQUEST } from 'rdx/constants/actionTypes'

export const changePasswordRequest = createAction(CHANGE_PASSWORD_REQUEST)