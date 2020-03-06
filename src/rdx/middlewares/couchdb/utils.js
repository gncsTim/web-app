import { addOrUpdateEvents } from 'components/eventList/action'
import { addGenre } from 'components/genres/action'

export const handleOnChangeRemote = store => change => {
  console.log(change, 'changed!')
  const events = change.docs.filter(item => item.type === 'event')
  if (events.length > 0) {
    store.dispatch(addOrUpdateEvents(events))
  }
  const genres = change.docs.filter(item => item.type === 'genre')
  if (genres.length > 0) {
    store.dispatch(addGenre(genres))
  }
}

export const handleOnPausedRemote = store => info => {
  console.log('replication paused.', info)
  store.dispatch({ type: 'ADD_MSG', payload: 'replication paused.' })
}

export const handleOnActiveRemote = store => info => {
  console.log('replication resumed.', info)
  store.dispatch({ type: 'ADD_MSG', payload: 'replication resumed.' })
}

export const handleOnDeniedRemote = store => info => {
  console.log('+++ DENIED +++', info)
  store.dispatch({ type: 'ADD_MSG', payload: '+++ DENIED +++' })
}

export const handleOnErrorRemote = store => err => {
  console.log('+++ ERROR ERROR ERROR +++.', err)
  store.dispatch({ type: 'ADD_MSG', payload: err })
}
