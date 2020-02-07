import PouchDB from 'pouchdb'

import { remoteCouchdbUrl } from './utils'
import {FETCH_EVENTS, ADD_EVENT} from 'rdx/constants/actionTypes'
// import { set_event_list } from 'Components/Event/List/actions'

export const couchdbMiddleware = store => next => {
    const localDB = new PouchDB('gncs')
    const remoteDB = new PouchDB(remoteCouchdbUrl)
    localDB.sync(remoteDB, {
      live: true,
      include_docs: true,
      retry: true
    }).on('change', handleOnChange(store))
      .on('paused', heanleOnPaused(store))
      .on('active', heanleOnActive(store))
      .on('denied', heanleOnDenied(store))
      .on('error', heanleOnError(store))

  const requests = new PouchDB('http://localhost:5984/requests')

  localDB.query('events/all', {include_docs: true, attachments: true})
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
    return action => {
      switch (action.type) {
        case ADD_EVENT:
            requests.put({
              _id: 'mydoc',
              title: 'Heroes'
            }).then(function (response) {
              console.log(response)
              // handle response
            }).catch(function (err) {
              console.log(err);
            });
          return console.log(action.payload)
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
