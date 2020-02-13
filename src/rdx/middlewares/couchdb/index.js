import PouchDB from 'pouchdb'
import PouchDBAuth from 'pouchdb-authentication'
import moment from 'moment'

import { remoteCouchdbUrl } from 'config'
import { ADD_EVENT } from 'rdx/constants/actionTypes'
import { setEventList, addOrUpdateEvents } from 'components/eventList/action'

export const couchdbMiddleware = store => next => {
  PouchDB.plugin(PouchDBAuth)
  const remoteDB = new PouchDB(remoteCouchdbUrl, { skip_setup: true })
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

  localDB
    .allDocs({ include_docs: true })
    .then(respone => {
      console.log(respone)
    })
    .catch(err => {
      console.log(err)
    })

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

      case ADD_EVENT:
        requests
          .put({
            _id: 'mydoc',
            type: 'request',
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
