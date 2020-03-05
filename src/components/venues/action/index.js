import { createAction } from 'redux-actions'

import { GET_ALL_VENUES, SET_VENUES } from 'rdx/constants/actionTypes'

export const get_all_venues = createAction(GET_ALL_VENUES)

export const set_venues = createAction(SET_VENUES)