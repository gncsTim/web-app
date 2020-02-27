import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

// import { nodeEnv } from 'config'
import reducer from 'rdx/reducers'
import { couchdbMiddleware } from 'rdx/middlewares/couchdb'
import { userMiddleware } from 'rdx/middlewares/couchdb/user'

let enhancers = []
// TODO: fix that for production mode
// if (nodeEnv === 'development') {
const composeEnhancers = composeWithDevTools({})
const logger = createLogger({
  collapsed: true
})
enhancers = composeEnhancers((enhancers = applyMiddleware(logger, couchdbMiddleware, userMiddleware)))
// }

export default createStore(reducer, enhancers)
