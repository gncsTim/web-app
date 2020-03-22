import { connect } from 'react-redux'

import EventFilter from '../component'

const mapState = state => ({
    genres: Array.from(new Set(state.eventList.map(event => event.genres).flat()))
  })

export default connect(mapState)(EventFilter)