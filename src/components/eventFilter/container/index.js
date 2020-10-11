import { connect } from 'react-redux'

import EventFilter from '../component'
import { setGenresFilter } from 'components/eventFilter/action'

const mapState = state => ({
    genres: Array.from(new Set(state.eventList.map(event => event.genres).flat()))
  })

const mapDispatch = dispatch => ({
    setGenresFilter: genres => dispatch(setGenresFilter(genres.values))

})

export default connect(mapState, mapDispatch)(EventFilter)
