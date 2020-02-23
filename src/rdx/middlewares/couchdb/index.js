import PouchDB from 'pouchdb'
import PouchDBAuth from 'pouchdb-authentication'
import moment from 'moment'

import history from 'rdx/history'
import { remoteCouchdbUrl } from 'config'
import { ADD_EVENT, LOGIN_REQUEST, GET_SESSION, LOGOUT } from 'rdx/constants/actionTypes'
import { setEventList, addOrUpdateEvents } from 'components/eventList/action'
import { loginRequestFaild } from 'components/user/login/action'
import { setUserCtx, resetUserCtx } from 'components/user/action'

export const couchdbMiddleware = store => next => {
  PouchDB.plugin(PouchDBAuth)
  console.log(remoteCouchdbUrl('gncs'))
  const remoteDB = new PouchDB(remoteCouchdbUrl('gncs'), { skip_setup: true })
  // remoteDB.info().then(function (result) {
  //   console.log(result)
  // }).catch(function (err) {
  //   console.log(err);
  // });
  // remoteDB
  //   .allDocs({ include_docs: true })
  //   .then(respone => {
  //     console.log(respone)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  const localDB = new PouchDB('gncs')
  console.log('puch')
  localDB.replicate
    .from(remoteDB, {
      live: true,
      filter: 'filters/current_events',
      include_docs: true,
      retry: true
    })
    // .on('complete', () => {
    //   console.log('complete')
    //   localDB
    //     .allDocs({ include_docs: true })
    //     .then(respone => {
    //       console.log(respone)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // })
    .on('change', handleOnChange(store))
    .on('paused', heanleOnPaused(store))
    .on('active', heanleOnActive(store))
    .on('denied', heanleOnDenied(store))
    .on('error', heanleOnError(store))

  // let test = new PouchDB('repli-test')
  // test.replicate
  //   .from(remoteDB, {
  //     filter: 'filters/noDeleted'
  //   })
  //   .on('complete', () => {
  //     test
  //       .allDocs()
  //       .then(res => {
  //         console.log(res)
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  //   })

  // localDB
  //   .allDocs({ include_docs: true })
  //   .then(respone => {
  //     console.log(respone)
  //     store.dispatch({type: 'ADD_MSG', payload: `total_rows: ${respone.total_rows}`})
  //     respone.rows.forEach(item => {
  //       store.dispatch({type: 'ADD_MSG', payload: item.id})
  //     })
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })

  localDB
    .query('events/all', { include_docs: true, attachments: true })
    .then(results => {
      console.log(results)
      store.dispatch(
        setEventList(
          results.rows
            .map(item => item.doc)
            .filter(doc => {
              const date = moment(doc.date)
              const now = moment()
              if (now.hours() < 7) {
                now.subtract(1, 'days')
              }
              now.startOf('day')
              if (date < now) {
                localDB.remove(doc, err => {
                  if (err) console.log(err)
                })
                return false
              }
              return true
            })
        )
      )
    })
    .catch(error => console.log(error))

  const requests = new PouchDB('requests')
  let syncRequests = PouchDB.replicate(requests, remoteCouchdbUrl('requests'), {
    live: true,
    retry: true,
    filter: doc => {
      console.log(doc)
      if(!doc._deleted) return false
      if(doc._id.match(/^_design\/.*/)) return true

    }
  })
    .on('change', function(info) {
      // handle change
      console.log('handle change: ', info)
    })
    .on('paused', function(err) {
      // replication paused (e.g. replication up to date, user went offline)
      console.log('replication paused (e.g. replication up to date, user went offline): ', err)
    })
    .on('active', function() {
      // replicate resumed (e.g. new changes replicating, user went back online)
      console.log('replicate resumed (e.g. new changes replicating, user went back online)')
    })
    .on('denied', function(err) {
      // a document failed to replicate (e.g. due to permissions)
      console.log('a document failed to replicate (e.g. due to permissions): ', err)
    })
    .on('complete', function(info) {
      // handle complete
      console.log('handle complete: ', info)
    })
    .on('error', function(err) {
      // handle error
      console.log('handle error: ', err)
    })

  return action => {
    const data = {
      _id: new Date().getTime().toString(),
      value: 'Okay'
    }
    switch (action.type) {
      case 'TEST_ACTION':
        console.log('try to put a doc to database: ', data)
        localDB
          .put(data)
          .then(response => {
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
        break
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
            if (response.roles.indexOf('_admin, editor')) {
              syncRequests.cancel()
              syncRequests = PouchDB.replicate(requests, remoteCouchdbUrl('gncs'), {
                live: true,
                retry: true
              })
                .on('change', function(info) {
                  // handle change
                  console.log('handle change: ', info)
                })
                .on('paused', function(err) {
                  // replication paused (e.g. replication up to date, user went offline)
                  console.log(
                    'replication paused (e.g. replication up to date, user went offline): ',
                    err
                  )
                })
                .on('active', function() {
                  // replicate resumed (e.g. new changes replicating, user went back online)
                  console.log(
                    'replicate resumed (e.g. new changes replicating, user went back online)'
                  )
                })
                .on('denied', function(err) {
                  // a document failed to replicate (e.g. due to permissions)
                  console.log('a document failed to replicate (e.g. due to permissions): ', err)
                })
                .on('complete', function(info) {
                  // handle complete
                  console.log('handle complete: ', info)
                })
                .on('error', function(err) {
                  // handle error
                  console.log('handle error: ', err)
                })
            }
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
            // response.userCtx.name is the current user
            console.log(response)
            store.dispatch(setUserCtx(response.userCtx))
          }
        })
        break
      case LOGOUT:
        remoteDB.logOut(function(err, response) {
          if (err) {
            console.log(err)
          } else {
            console.log(response)
            store.dispatch(resetUserCtx())
            syncRequests.cancel()
            syncRequests = PouchDB.sync(remoteCouchdbUrl('requests'), requests, {
              live: true,
              retry: true
            })
              .on('change', function(info) {
                // handle change
                console.log('handle change: ', info)
              })
              .on('paused', function(err) {
                // replication paused (e.g. replication up to date, user went offline)
                console.log(
                  'replication paused (e.g. replication up to date, user went offline): ',
                  err
                )
              })
              .on('active', function() {
                // replicate resumed (e.g. new changes replicating, user went back online)
                console.log(
                  'replicate resumed (e.g. new changes replicating, user went back online)'
                )
              })
              .on('denied', function(err) {
                // a document failed to replicate (e.g. due to permissions)
                console.log('a document failed to replicate (e.g. due to permissions): ', err)
              })
              .on('complete', function(info) {
                // handle complete
                console.log('handle complete: ', info)
              })
              .on('error', function(err) {
                // handle error
                console.log('handle error: ', err)
              })
          }
        })
        break
      case ADD_EVENT:
        // if (userCtx && userCtx.roles.indexOf('_admin', 'editor') !== -1) {
        // console.log(userCtx.roles.indexOf('_admin', 'editor'))
        // localDB.put(action.payload)
        requests
          .put(action.payload)
          .then(response => {
            console.log(response)
          })
          .catch(err => {
            console.error(err)
          })
        return console.log(action.payload)
        // }
        // TODO: add request show for user
        // console.log('start request')
        // requests
        //   .put({
        //     _id: 'mydoc',
        //     type: 'request',
        //     title: 'Heroes'
        //   })
        //   .then(function (response) {
        //     console.log(response)
        //     // handle response
        //   })
        //   .catch(function (err) {
        //     console.log(err)
        //   })
        // console.log(action.payload)
        // break
      default:
    }
    next(action)
  }
}

const handleOnChange = store => change => {
  console.log(change, 'changed!')
  const events = change.docs.filter(item => item.type === 'event')
  if (events.length > 0) {
    store.dispatch(addOrUpdateEvents(events))
  }

  // change.docs.forEach(doc => {
  //   switch (doc.type) {
  //     case 'event':
  //       console.log(doc)
  //       return
  //     default:
  //       return
  //   }
  // })
}

const heanleOnPaused = store => info => {
  console.log('replication paused.', info)
  store.dispatch({ type: 'ADD_MSG', payload: 'replication paused.' })
}

const heanleOnActive = store => info => {
  console.log('replication resumed.', info)
  store.dispatch({ type: 'ADD_MSG', payload: 'replication resumed.' })
}

const heanleOnDenied = store => info => {
  console.log('+++ DENIED +++', info)
  store.dispatch({ type: 'ADD_MSG', payload: '+++ DENIED +++' })
}

const heanleOnError = store => err => {
  console.log('+++ ERROR ERROR ERROR +++.', err)
  store.dispatch({ type: 'ADD_MSG', payload: err })
}
