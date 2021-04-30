import { connect } from 'react-redux'

import EventFilter from '../component'
import { setGenresFilter, setRegionsFilter } from 'components/eventFilter/action'

const mapState = (state) => ({
    genres: Array.from(new Set(state.eventList.map((event) => event.genres).flat())),
    eventFilter: state.eventFilter

})

const mapDispatch = (dispatch) => ({
    setGenresFilter: (genres) => dispatch(setGenresFilter(genres)),
    setRegionsFilter: (regions) => dispatch(setRegionsFilter(regions)),

})

export default connect(mapState, mapDispatch)(EventFilter)
