import { createAction } from 'redux-actions'

import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAILD,
  LOGIN_REQUEST_SUCCESS
} from 'rdx/constants/actionTypes'

export const loginRequest = createAction(LOGIN_REQUEST)

export const loginRequestSuccess = createAction(LOGIN_REQUEST_SUCCESS)

export const loginRequestFaild = createAction(LOGIN_REQUEST_FAILD)
