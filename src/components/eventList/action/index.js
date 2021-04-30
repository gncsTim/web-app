import {createAction} from 'redux-actions'
import { SET_EVENT_LIST, ADD_OR_UPDATE_EVENTS, LOAD_REQUESTED_SHOWS, FETCH_LOAD_REQUESTED_SHOWS } from 'rdx/constants/actionTypes'


export const setEventList = createAction(SET_EVENT_LIST)
export const addOrUpdateEvents = createAction(ADD_OR_UPDATE_EVENTS)
export const loadRequestedShows = createAction(LOAD_REQUESTED_SHOWS)
export const fetchLoadRequestedShows = createAction(FETCH_LOAD_REQUESTED_SHOWS)