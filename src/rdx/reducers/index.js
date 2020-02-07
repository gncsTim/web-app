import { combineReducers } from 'redux'

import { eventListReducer } from 'components/eventList/reducer'
import { loginStateReducer } from 'components/user/login/reducer'
import { userCtxReducer } from 'components/user/reducer'
// import {eventListReducer} from 'components/event/reducers'

export default combineReducers({
  eventList: eventListReducer,
  loginState: loginStateReducer,
  userCtx: userCtxReducer,
  appVersion: (state = '1.1.1', action) => state
})
