import { connect } from 'react-redux'
import EventList from '../component/acceptedShows'

const mapState = (state) => ({
    eventList: state.eventList,
    eventFilter: state.eventFilter,
})

const connector = connect(mapState)

export default connector(EventList)
