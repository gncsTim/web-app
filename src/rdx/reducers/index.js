import { combineReducers } from 'redux'

import {eventListReducer} from 'components/eventList/reducer'

// import {eventListReducer} from 'components/event/reducers'




export default combineReducers({
    eventList: eventListReducer,
    appVersion: (state='1.1.1', action) => state
})
