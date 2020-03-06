import { createAction } from 'redux-actions'
import { GET_ALL_GENRES, SET_GENRES, ADD_GENRE } from 'rdx/constants/actionTypes'

export const getAllGenres = createAction(GET_ALL_GENRES)
export const setGenres = createAction(SET_GENRES)
export const addGenre = createAction(ADD_GENRE)