import PouchDB from 'pouchdb'

import { addOrUpdateEvents } from 'components/eventList/action'

export const handleOnChangeRemote = store => change => {
  console.log(change, 'changed!')
  const events = change.docs.filter(item => item.type === 'event')
  if (events.length > 0) {
    store.dispatch(addOrUpdateEvents(events))
  }
}

export const heanleOnPausedRemote = store => info => {
  console.log('replication paused.', info)
  store.dispatch({ type: 'ADD_MSG', payload: 'replication paused.' })
}

export const heanleOnActiveRemote = store => info => {
  console.log('replication resumed.', info)
  store.dispatch({ type: 'ADD_MSG', payload: 'replication resumed.' })
}

export const heanleOnDeniedRemote = store => info => {
  console.log('+++ DENIED +++', info)
  store.dispatch({ type: 'ADD_MSG', payload: '+++ DENIED +++' })
}

export const heanleOnErrorRemote = store => err => {
  console.log('+++ ERROR ERROR ERROR +++.', err)
  store.dispatch({ type: 'ADD_MSG', payload: err })
}

export const updateRequestSync = (local, remote, ids, shoudSync) => {
  const handleChange = info => {
    // handle change
    console.log('handle change: ', info)
  }
  let sync = null
  if (shoudSync) {
    sync = PouchDB.sync(local, remote, {
      live: true,
      retry: true,
      filter: doc => {
        console.log(ids, doc)
        console.log(ids.indexOf(doc._id) !== -1)
        return ids.indexOf(doc._id) !== -1
      }
    })
  } else {
    console.log('todo')
  }
  sync
    .on('change', handleChange)
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
}
