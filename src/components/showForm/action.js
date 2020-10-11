import { createAction } from 'redux-actions'

import {
    ADD_EVENT,
    SET_OWN_REQUEST,
    ADD_EVENT_REMOTE,
    ADD_EVENT_SUCCESS,
    ADD_EVENT_ERROR,
    REST_ADD_EVENT_REQUEST,
} from 'rdx/constants/actionTypes'

export const addEvent = createAction(ADD_EVENT)
export const addEventRemote = createAction(ADD_EVENT_REMOTE)
export const setOwnRequest = createAction(SET_OWN_REQUEST)
export const addEventSuccess = createAction(ADD_EVENT_SUCCESS)
export const addEventError = createAction(ADD_EVENT_ERROR)
export const resetAddEventRequest = createAction(REST_ADD_EVENT_REQUEST)
