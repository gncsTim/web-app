import { connect } from 'react-redux'

import EventFilter from '../component'

const mapState = state => ({
    genres: state.genres
  })

export default connect()(EventFilter)