import history from 'rdx/history'
import { remoteDB } from './index'
import {
  LOGIN_REQUEST,
  GET_SESSION,
  LOGOUT,
  CHANGE_PASSWORD_REQUEST
} from 'rdx/constants/actionTypes'
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
      case CHANGE_PASSWORD_REQUEST:
        console.log(store.getState().userCtx)
        remoteDB.logIn(store.getState().userCtx.name, action.payload.oldPassword, function(
          err,
          response
        ) {
          if (err) {
            console.log('change passwor faild')
          } else {
            console.log(response)
            remoteDB.changePassword(
              store.getState().userCtx.name,
              action.payload.newPassword,
              (err, response) => {
                if (err) {
                  console.error(err)
                  if (err.name === 'not_found') {
                    // typo, or you don't have the privileges to see this user
                  } else {
                    // some other error
                  }
                } else {
                  console.log(response)
                  // response is the user update response
                  // {
                  //   "ok": true,
                  //   "id": "org.couchdb.user:spiderman",
                  //   "rev": "2-09310a62dcc7eea42bf3d4f67e8ff8c4"
                  // }
                }
              }
            )
          }
        })
        break
      default:
        break
    }
    next(action)
  }
}
