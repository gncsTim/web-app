import history from 'rdx/history'
import { remoteDB } from './index'
import { LOGIN_REQUEST, GET_SESSION, LOGOUT } from 'rdx/constants/actionTypes'
import { setUserCtx, resetUserCtx } from 'components/user/action'
import { loginRequestFaild } from 'components/user/login/action'

export const userMiddleware = store => next => {
  return action => {
    switch (action.type) {
      case LOGIN_REQUEST:
        remoteDB.logIn(action.payload.email, action.payload.password, function(err, response) {
          if (err) {
            store.dispatch(loginRequestFaild(err))
          } else {
            console.log(response)
            store.dispatch(
              setUserCtx({
                name: response.name,
                roles: response.roles
              })
            )
            history.push('/')
          }
        })
        break
      case GET_SESSION:
        remoteDB.getSession(function(err, response) {
          if (err) {
            console.log(err)
          } else if (!response.userCtx.name) {
            console.log('nobodys logged in')
          } else {
            store.dispatch(setUserCtx(response.userCtx))
          }
        })
        break
      case LOGOUT:
        remoteDB.logOut(function(err) {
          if (err) {
            console.log(err)
          } else {
            store.dispatch(resetUserCtx())
          }
        })
        break
      default:
        break
    }
    next(action)
  }
}
