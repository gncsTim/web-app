import { connect } from 'react-redux'

import RequestActor from './component'
import { setRequestSync } from './action'

const mapState = state => ({
  owneRequestIds: state.owneRequestIds
})

const mapDispatch = dispatch => ({
  setRequestSync: ids => dispatch(setRequestSync(ids))
})

export default connect(mapState, mapDispatch)(RequestActor)
