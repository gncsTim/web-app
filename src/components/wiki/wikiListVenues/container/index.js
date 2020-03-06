import { connect } from 'react-redux';
import WikiListVenues from '../component';


const mapState = state => ({
  bandList: ["SO36", "Urban Spree" ],
})

const connector = connect(
  mapState
)

export default connector(WikiListVenues);
