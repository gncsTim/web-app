import { connect } from 'react-redux'
import EventList from '../component'

const mapState = (state, ownProps) => ({
  event: state.eventList.find(item => item._id === ownProps.match.params.id)
})

const mapDispatch = dispatch => ({
  handleClick: () => dispatch({
    type: 'TEST_ACTION'
  })
})

const connector = connect(mapState, mapDispatch)

export default connector(EventList)
