import { combineReducers } from 'redux'

import { eventListReducer } from 'components/eventList/reducer'
import { loginStateReducer } from 'components/user/login/reducer'
import { userCtxReducer } from 'components/user/reducer'
import { ownRequestIdsReducer } from 'components/actors/request/reducer'
import { addShowRequestReducer } from 'components/addShow/reducer'
import { venuesReducer } from 'components/venues/reducer'

export default combineReducers({
  eventList: eventListReducer,
  loginState: loginStateReducer,
  userCtx: userCtxReducer,
  ownRequestIds: ownRequestIdsReducer,
  addShowRequest: addShowRequestReducer,
  venues: venuesReducer
})
