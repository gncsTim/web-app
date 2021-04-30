import { createAction } from 'redux-actions'

import { SET_GENRES_FILTER, SET_REGIONS_FILTER } from 'rdx/constants/actionTypes'

export const setGenresFilter = createAction(SET_GENRES_FILTER)
export const setRegionsFilter = createAction(SET_REGIONS_FILTER)
