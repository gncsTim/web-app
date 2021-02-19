import { connect } from 'react-redux'
import ShowForm from './component'
import { addEvent, addEventRemote, resetAddEventRequest } from './action'
import { getAllVenues } from 'components/venues/action'
import { getAllGenres } from 'components/genres/action'

const mapState = (state) => ({
    userCtx: state.userCtx,
    venues: state.venues,
    genres: state.genres,
})

const mapDispatch = (dispatch) => ({
    addEvent: (event) => dispatch(addEvent(event)),
    addEventRemote: (event) => dispatch(addEventRemote(event)),
    resetAddEventRequest: () => dispatch(resetAddEventRequest()),
    getAllVenues: () => dispatch(getAllVenues()),
    getAllGenres: () => dispatch(getAllGenres()),
})

const connector = connect(mapState, mapDispatch)

export default connector(ShowForm)
