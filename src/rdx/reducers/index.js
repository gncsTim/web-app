import { combineReducers } from 'redux'

import { eventListReducer, eventRequestetShowsReducer } from 'components/eventList/reducer'
import { loginStateReducer } from 'components/user/login/reducer'
import { userCtxReducer } from 'components/user/reducer'
import { ownRequestIdsReducer } from 'components/actors/request/reducer'
import { addShowRequestReducer } from 'components/addShow/reducer'
import { venuesReducer } from 'components/venues/reducer'
import { genresReducer } from 'components/genres/reducer'
import { eventFilterReducer } from 'components/eventFilter/reducer'
import { privacyReducer } from 'components/privacyModal/privacy/reducer'

export default combineReducers({
    eventList: eventListReducer,
    requestedShows: eventRequestetShowsReducer,
    loginState: loginStateReducer,
    userCtx: userCtxReducer,
    ownRequestIds: ownRequestIdsReducer,
    addShowRequest: addShowRequestReducer,
    venues: venuesReducer,
    genres: genresReducer,
    eventFilter: eventFilterReducer,
    privacy: privacyReducer,
})
