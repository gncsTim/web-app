import { connect } from 'react-redux';
import WikiListBands from '../component';


const mapState = state => ({
  name: "Operators",
})

const connector = connect(
  mapState
)

export default connector(WikiListBands);
