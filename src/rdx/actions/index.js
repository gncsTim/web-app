import { createAction } from 'redux-actions'

import { PUSH_ROUTE_TO_HISTORY } from 'rdx/constants/actionTypes'

export const pushRouteWihtDebounce = debounce =>
  createAction(
    PUSH_ROUTE_TO_HISTORY,
    route => route,
    () => ({
      debounce: {
        time: debounce,
        key: 'PUSH_ROUTE_TO_HISTORY'
      }
    })
  )

export const pushRoute = createAction(PUSH_ROUTE_TO_HISTORY)