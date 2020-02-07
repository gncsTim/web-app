import { combineReducers } from 'redux'

import { eventListReducer } from 'components/eventList/reducer'
import { loginStateReducer } from 'components/user/login/reducer'
// import {eventListReducer} from 'components/event/reducers'

export default combineReducers({
  eventList: eventListReducer,
  loginState: loginStateReducer,
  appVersion: (state = '1.1.1', action) => state
})
