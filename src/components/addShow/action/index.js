import { createAction } from 'redux-actions'

import {ADD_EVENT, SET_OWNE_REQUEST, ADD_EVENT_REMOTE} from 'rdx/constants/actionTypes'

export const addEvent = createAction(ADD_EVENT)
export const addEventRemote = createAction(ADD_EVENT_REMOTE)
export const setOwneRequest = createAction(SET_OWNE_REQUEST)