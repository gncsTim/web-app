import { createAction } from 'redux-actions'

import {ADD_EVENT, SET_OWNE_REQUEST} from 'rdx/constants/actionTypes'

export const addEvent = createAction(ADD_EVENT)  
export const setOwneRequest = createAction(SET_OWNE_REQUEST)