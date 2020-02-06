import {ADD_EVENT} from 'rdx/constants/actionTypes'

export const addEvent = event => {
    return {
      type: ADD_EVENT,
      payload: event
    }
  }
  