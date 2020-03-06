import {connect} from 'react-redux';
import EventList from '../component';

const mapState = state => ({
    eventList: state.eventList
})

const connector = connect(
  mapState
)


export default connector(EventList);
