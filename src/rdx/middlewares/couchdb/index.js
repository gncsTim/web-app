import PouchDB from 'pouchdb'
import PouchDBAuth from 'pouchdb-authentication'

import { remoteCouchdbUrl } from 'config'
import { FETCH_EVENTS, ADD_EVENT, LOGIN_REQUEST } from 'rdx/constants/actionTypes'
import { loginRequestFaild } from 'components/user/login/action'
// import { set_event_list } from 'Components/Event/List/actions'

export const couchdbMiddleware = store => next => {
  PouchDB.plugin(PouchDBAuth)
  let localDB = null
  const remoteDB = new PouchDB(remoteCouchdbUrl, { skip_setup: true })

  localDB = new PouchDB('gncs')
  localDB
    .sync(remoteDB, {
      live: true,
      include_docs: true,
      retry: true
    })
    .on('change', handleOnChange(store))
    .on('paused', heanleOnPaused(store))
    .on('active', heanleOnActive(store))
    .on('denied', heanleOnDenied(store))
    .on('error', heanleOnError(store))

  localDB
    .query('events/all', { include_docs: true, attachments: true })
    .then(results => {
      console.log(results)
      // results.rows.forEach(row => {
      //   let { doc } = row

      // })
      store.dispatch({
        type: FETCH_EVENTS,
        payload: results.rows.map(item => item.doc)
      })
      // store.dispatch(set_event_list(results))
    })
    .catch(error => console.log(error))

  const requests = new PouchDB('http://localhost:5984/requests')

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
            return console.log(response)
          }
        })
        break
      case ADD_EVENT:
        requests
          .put({
            _id: 'mydoc',
            title: 'Heroes'
          })
          .then(function(response) {
            console.log(response)
            // handle response
          })
          .catch(function(err) {
            console.log(err)
          })
        console.log(action.payload)
        break
      default:
    }
    next(action)
  }
}

const handleOnChange = store => change => {
  console.log(change, 'changed!')
  change.docs.forEach(doc => {
    switch (doc.type) {
      case 'event':
        return
      default:
        return
    }
  })
}

const heanleOnPaused = store => info => {
  console.log('replication paused.')
}

const heanleOnActive = store => info => {
  console.log('replication resumed.')
}

const heanleOnDenied = store => info => {
  console.log('+++ DENIED +++', info)
}

const heanleOnError = store => err => {
  console.log('+++ ERROR ERROR ERROR +++.', err)
}
