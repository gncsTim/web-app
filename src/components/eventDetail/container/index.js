import {connect} from 'react-redux';
import EventList from '../component';

const mapState = (state, ownProps) => ({    
    event: state.eventList.find(item => item._id === ownProps.match.params.id)
})

const connector = connect(
  mapState
)


export default connector(EventList);
