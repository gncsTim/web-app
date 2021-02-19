import { connect } from 'react-redux'
import EventList from '../component'
import { pushRoute } from 'rdx/actions'

const mapState = (state, ownProps) => ({
    event: state.eventList.find((item) => item._id === ownProps.match.params.id),
    isEventListEmpty: state.eventList.length === 0,
})

const mapDispatch = (dispatch) => ({
    redirctToPageNotFound: () => dispatch(pushRoute('/pageNotFound')),
})

const connector = connect(mapState, mapDispatch)

export default connector(EventList)
