import { connect } from 'react-redux'
import AddEvent from '../component'
import { addEvent, addEventRemote, resetAddEventRequest } from '../action'
import {pushRouteWihtDebounce} from 'rdx/actions'

const mapState = state => ({
  addShowRequest: state.addShowRequest,
  userCtx: state.userCtx
})

const mapDispatch = dispatch => ({
  addEvent: event => dispatch(addEvent(event)),
  addEventRemote: event => dispatch(addEventRemote(event)),
  resetAddEventRequest: () => dispatch(resetAddEventRequest()),
  pushRoute: () => {
    dispatch(pushRouteWihtDebounce(2000)('/'))
}
})

const connector = connect(mapState, mapDispatch)

export default connector(AddEvent)
