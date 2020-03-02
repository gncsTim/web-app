import { connect } from 'react-redux'
import AddEvent from '../component'
import { addEvent, addEventRemote } from '../action'

const mapState = state => ({
  userCtx: state.userCtx
})

const mapDispatch = dispatch => ({
  addEvent: event => dispatch(addEvent(event)),
  addEventRemote: event => dispatch(addEventRemote(event))
})

const connector = connect(mapState, mapDispatch)

export default connector(AddEvent)
