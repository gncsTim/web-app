import { combineReducers } from 'redux'

import { eventListReducer } from 'components/eventList/reducer'
import { loginStateReducer } from 'components/user/login/reducer'
import { userCtxReducer } from 'components/user/reducer'
import { owneRequestIdsReducer } from 'components/actors/request/reducer'

export default combineReducers({
  eventList: eventListReducer,
  loginState: loginStateReducer,
  userCtx: userCtxReducer,
  owneRequestIds: owneRequestIdsReducer
})
