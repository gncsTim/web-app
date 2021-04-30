import { connect } from 'react-redux'
import RequestedShows from '../component/requestedShows'
import { loadRequestedShows } from '../action'

const mapState = (state) => ({
    requestedShows: state.requestedShows
})

const mapDispatch = (dispatch) => ({
    loadRequestedShows: () => dispatch(loadRequestedShows())
})

export default connect(mapState, mapDispatch)(RequestedShows)
