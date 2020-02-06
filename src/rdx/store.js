import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from 'rdx/reducers'
import { couchdbMiddleware } from 'rdx/middlewares/couchdb'

let enhancers = []
if (process.env.NODE_ENV === 'development') {
  console.log('test')
  const composeEnhancers = composeWithDevTools({})
  const logger = createLogger({
    collapsed: true
  })
  enhancers = composeEnhancers(
  enhancers = applyMiddleware(
    logger,
    couchdbMiddleware
    )
  )
}

export default createStore(
  reducer,
  enhancers
)
