import { SET_EVENT_LIST, ADD_OR_UPDATE_EVENTS } from 'rdx/constants/actionTypes'

export const setEventList = (events) => {
    return {
        type: SET_EVENT_LIST,
        payload: events,
    }
}

export const addOrUpdateEvents = (events) => {
    return {
        type: ADD_OR_UPDATE_EVENTS,
        payload: events,
    }
}

export const randomFigure = (maxValue) => {
    return Math.floor(Math.random() * maxValue)
}

export default randomFigure