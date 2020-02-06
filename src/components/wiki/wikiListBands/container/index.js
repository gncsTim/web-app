import { connect } from 'react-redux';
import WikiListBands from '../component';


const mapState = state => ({
  bandList: ["Berliner Weisse", "Operators" ],
})

const connector = connect(
  mapState
)

export default connector(WikiListBands);
