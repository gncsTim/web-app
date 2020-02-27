import PouchDB from 'pouchdb'
import PouchDBAuth from 'pouchdb-authentication'
import moment from 'moment'

import {
  handleOnChangeRemote,
  heanleOnPausedRemote,
  heanleOnActiveRemote,
  heanleOnDeniedRemote,
  heanleOnErrorRemote,
  updateRequestSync
} from './utils'
import { remoteCouchdbUrl } from 'config'
import { ADD_EVENT, SET_REQUEST_SYNC } from 'rdx/constants/actionTypes'
import { setOwneRequest } from 'components/addShow/action'
import { setEventList } from 'components/eventList/action'

PouchDB.plugin(PouchDBAuth)
export const remoteDB = new PouchDB(remoteCouchdbUrl('gncs'), { skip_setup: true })
export const localDB = new PouchDB('gncs')

export const couchdbMiddleware = store => next => {
  localDB.replicate
    .from(remoteDB, {
      live: true,
      filter: 'filters/current_events',
      include_docs: true,
      retry: true
    })
    .on('change', handleOnChangeRemote(store))
    .on('paused', heanleOnPausedRemote(store))
    .on('active', heanleOnActiveRemote(store))
    .on('denied', heanleOnDeniedRemote(store))
    .on('error', heanleOnErrorRemote(store))

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
  let syncRequests = null
  // PouchDB.replicate(requests, remoteCouchdbUrl('requests'), {
  //   live: true,
  //   retry: true,
  //   filter: doc => {
  //     console.log(doc)
  //     if (!doc._deleted) return false
  //     if (doc._id.match(/^_design\/.*/)) return true
  //   }
  // })
  //   .on('change', function(info) {
  //     // handle change
  //     console.log('handle change: ', info)
  //   })
  //   .on('paused', function(err) {
  //     // replication paused (e.g. replication up to date, user went offline)
  //     console.log('replication paused (e.g. replication up to date, user went offline): ', err)
  //   })
  //   .on('active', function() {
  //     // replicate resumed (e.g. new changes replicating, user went back online)
  //     console.log('replicate resumed (e.g. new changes replicating, user went back online)')
  //   })
  //   .on('denied', function(err) {
  //     // a document failed to replicate (e.g. due to permissions)
  //     console.log('a document failed to replicate (e.g. due to permissions): ', err)
  //   })
  //   .on('complete', function(info) {
  //     // handle complete
  //     console.log('handle complete: ', info)
  //   })
  //   .on('error', function(err) {
  //     // handle error
  //     console.log('handle error: ', err)
  //   })

  requests
    .allDocs({ include_docs: true })
    .then(respone => {
      console.log(respone)
      store.dispatch(setOwneRequest(respone.rows.map(item => item.id)))
    })
    .catch(err => {
      console.error(err)
    })
  return action => {
    const userCtx = store.getState().userCtx
    const owneRequestIds = store.getState().owneRequestIds
    console.log(action.type)
    switch (action.type) {
      case SET_REQUEST_SYNC:
        console.log(action)
        console.log(userCtx)
        if (syncRequests) syncRequests.cancel()
        if (userCtx && userCtx.roles.indesOf('_admin', 'editor')) {
          console.log('todo')
        } else {
          updateRequestSync(requests, remoteCouchdbUrl('request'), action.payload, true)
        }
        break
      // case SET_OWNE_REQUEST:
      //   console.log(action.payload)
      //   if (syncRequests) syncRequests.cancel()
      // updateRequestSync(
      //   requests,
      //   userCtx.roles.indexOf('_admin', 'editor')
      //     ? remoteCouchdbUrl('gncs')
      //     : remoteCouchdbUrl('request'),
      //   action.payload
      // )
      // break
      case ADD_EVENT:
        console.log(owneRequestIds)
        requests
          .put(action.payload)
          .then(response => {
            console.log(response)
            console.log(owneRequestIds.concat(action.payload))
            console.log(userCtx)

            // updateRequestSync(
            //   requests,
            //   userCtx.roles.indexOf('_admin', 'editor')
            //     ? remoteCouchdbUrl('gncs')
            //     : remoteCouchdbUrl('request'),
            //   owneRequestIds.concat(action.payload)
            // )
          })
          .catch(err => {
            console.error(err)
          })
        return console.log(action.payload)
      default:
    }
    next(action)
  }
}
