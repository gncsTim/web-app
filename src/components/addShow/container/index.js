import {connect} from 'react-redux';
import AddEvent from '../component';
import {addEvent} from '../action'

const mapDispatch = dispatch => ({    
    addEvent: event => dispatch(addEvent(event))
})

const connector = connect(
  null,
  mapDispatch
)


export default connector(AddEvent);
