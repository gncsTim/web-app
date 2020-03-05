import { PUSH_ROUTE_TO_HISTORY } from 'rdx/constants/actionTypes'
import history from 'rdx/history'

export const routeHistoryMiddleware = () => next => {
  return action => {
    switch (action.type) {
      case PUSH_ROUTE_TO_HISTORY:
        history.push(action.payload)
        break
      default:
        break
    }
    return next(action)
  }
}
