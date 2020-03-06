import {FETCH_EVENTS} from 'rdx/constants/actionTypes'

export const fetch_events = events => {
    return {
      type: FETCH_EVENTS,
      payload: events
    }
  }
  
