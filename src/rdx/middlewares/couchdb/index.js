import PouchDB from 'pouchdb'
import PouchDBAuth from 'pouchdb-authentication'
import moment from 'moment'

import {
    handleOnChangeRemote,
    handleOnPausedRemote,
    handleOnActiveRemote,
    handleOnDeniedRemote,
    handleOnErrorRemote,
} from './utils'
import { remoteCouchdbUrl } from 'config'
import {
    ADD_EVENT,
    SET_REQUEST_SYNC,
    ADD_EVENT_REMOTE,
    SET_USER_CTX,
    GET_ALL_VENUES,
    GET_ALL_GENRES,
    LOAD_REQUESTED_SHOWS,
} from 'rdx/constants/actionTypes'
import {
    setOwnRequest,
    addEventSuccess,
    addEventError,
} from 'components/addShow/action'
import {
    setEventList,
    addOrUpdateEvents,
    fetchLoadRequestedShows,
} from 'components/eventList/action'
import { setVenues } from 'components/venues/action'
import { setGenres } from 'components/genres/action'
import { isAdminOrEditor } from 'components/user/utils'

PouchDB.plugin(PouchDBAuth)
export const remoteDB = new PouchDB(remoteCouchdbUrl('gncs'), {
    skip_setup: true,
})
export const localDB = new PouchDB('gncs')
export const requests = new PouchDB('requests')

export const couchdbMiddleware = (store) => (next) => {
    localDB.replicate
        .from(remoteDB, {
            live: true,
            filter: 'filters/current_events',
            include_docs: true,
            retry: true,
        })
        .on('change', handleOnChangeRemote(store))
        .on('paused', handleOnPausedRemote(store))
        .on('active', handleOnActiveRemote(store))
        .on('denied', handleOnDeniedRemote(store))
        .on('error', handleOnErrorRemote(store))

    localDB
        .query('events/all', { include_docs: true, attachments: true })
        .then((results) => {
            store.dispatch(
                setEventList(
                    results.rows
                        .map((item) => item.doc)
                        .filter((doc) => {
                            const date = moment(doc.date)
                            const now = moment()
                            if (now.hours() < 7) {
                                now.subtract(1, 'days')
                            }
                            now.startOf('day')
                            if (date < now) {
                                localDB.remove(doc, (err) => {
                                    if (err) console.log(err)
                                })
                                return false
                            }
                            return true
                        })
                )
            )
        })
        .catch((error) => console.log(error))

    let syncRequests = null

    requests
        .allDocs({ include_docs: true })
        .then((respone) => {
            console.log(respone)
            store.dispatch(setOwnRequest(respone.rows.map((item) => item.id)))
        })
        .catch((err) => {
            console.error(err)
        })
    return (action) => {
        switch (action.type) {
            case GET_ALL_GENRES:
                localDB
                    .query('genres/all', { include_docs: true })
                    .then((response) => {
                        store.dispatch(
                            setGenres(response.rows.map((item) => item.doc))
                        )
                    })
                    .catch((err) => {
                        console.error(err)
                    })
                break
            case GET_ALL_VENUES:
                localDB
                    .query('venues/all', { include_docs: true })
                    .then((response) => {
                        store.dispatch(
                            setVenues(response.rows.map((item) => item.doc))
                        )
                    })
                    .catch((err) => {
                        console.error(err)
                    })
                break
            case SET_REQUEST_SYNC:
                if (syncRequests) syncRequests.cancel()
                // requests.allDocs({include_docs: true})
                //   .then(response => console.log(response))
                //   .catch(error => console.log(error))
                syncRequests = PouchDB.replicate(
                    requests,
                    remoteCouchdbUrl('request'),
                    {
                        // live: true,
                        retry: true,
                    }
                )
                    .on('change', (info) => {
                        console.log(info)
                    })
                    .on('paused', function (err) {
                        // replication paused (e.g. replication up to date, user went offline)
                        console.log(
                            'replication paused (e.g. replication up to date, user went offline): ',
                            err
                        )
                    })
                    .on('active', function () {
                        // replicate resumed (e.g. new changes replicating, user went back online)
                        console.log(
                            'replicate resumed (e.g. new changes replicating, user went back online)'
                        )
                    })
                    .on('denied', function (err) {
                        // a document failed to replicate (e.g. due to permissions)
                        console.log(
                            'a document failed to replicate (e.g. due to permissions): ',
                            err
                        )
                    })
                    .on('complete', function (info) {
                        // handle complete
                        console.log('handle complete: ', info)
                    })
                    .on('error', function (err) {
                        // handle error
                        console.log('handle error: ', err)
                    })
                break
            case ADD_EVENT:
                requests
                    .put(action.payload)
                    .then((response) => {
                        store.dispatch(addEventSuccess(response))
                    })
                    .catch((err) => {
                        store.dispatch(addEventError(err))
                    })
                return console.log(action.payload)
            case ADD_EVENT_REMOTE:
                localDB
                    .put(action.payload)
                    .then((response) => {
                        store.dispatch(addEventSuccess(response))
                    })
                    .catch((err) => {
                        store.dispatch(addEventError(err))
                    })
                break
            case SET_USER_CTX:
                if (isAdminOrEditor(action.payload.roles)) {
                    PouchDB.replicate(localDB, remoteDB, {
                        live: true,
                        retry: true,
                    })
                        .on('change', (change) => {
                            const events = change.docs.filter(
                                (item) => item.type === 'event'
                            )
                            if (events.length > 0) {
                                store.dispatch(addOrUpdateEvents(events))
                            }
                        })
                        .on('paused', function (err) {
                            // replication paused (e.g. replication up to date, user went offline)
                            console.log(
                                'replication paused (e.g. replication up to date, user went offline): ',
                                err
                            )
                        })
                        .on('active', function () {
                            // replicate resumed (e.g. new changes replicating, user went back online)
                        })
                        .on('denied', function (err) {
                            // a document failed to replicate (e.g. due to permissions)
                            console.log(
                                'a document failed to replicate (e.g. due to permissions): ',
                                err
                            )
                        })
                        .on('complete', function (info) {
                            // handle complete
                            console.log('handle complete: ', info)
                        })
                        .on('error', function (err) {
                            // handle error
                            console.log('handle error: ', err)
                        })
                }
                break
            case LOAD_REQUESTED_SHOWS:
                new PouchDB(remoteCouchdbUrl('request'))
                    .allDocs({
                        include_docs: true,
                    })
                    .then((results) => {
                        store.dispatch(fetchLoadRequestedShows(results))
                    })
                    .catch((err) => {
                        console.error(err)
                    })
                break
            default:
        }
        next(action)
    }
}
