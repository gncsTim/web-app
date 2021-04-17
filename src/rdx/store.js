import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import createDebounce from 'redux-debounced'

// import { nodeEnv } from 'config'
import reducer from 'rdx/reducers'
import { couchdbMiddleware } from 'rdx/middlewares/couchdb'
import { userMiddleware } from 'rdx/middlewares/couchdb/user'
import { routeHistoryMiddleware } from 'rdx/middlewares/routeHistory'
import { appUserMiddleware } from 'components/user/middleware'
import { privacyMiddleware } from 'components/footer/privacy/middleware'

let enhancers = []
// TODO: fix that for production mode
// if (nodeEnv === 'development') {
const composeEnhancers = composeWithDevTools({})
const logger = createLogger({
    collapsed: true,
})
enhancers = composeEnhancers(
    (enhancers = applyMiddleware(
        logger,
        createDebounce(),
        couchdbMiddleware,
        userMiddleware,
        appUserMiddleware,
        routeHistoryMiddleware,
        privacyMiddleware
    ))
)
// }

export default createStore(reducer, enhancers)
