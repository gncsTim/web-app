import { createAction } from 'redux-actions'

import { GET_ALL_VENUES, SET_VENUES } from 'rdx/constants/actionTypes'

export const getAllVenues = createAction(GET_ALL_VENUES)

export const setVenues = createAction(SET_VENUES)