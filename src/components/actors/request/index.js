import { connect } from 'react-redux'

import RequestActor from './component'
import { setRequestSync } from './action'

const mapState = state => ({
  owneRequestIds: state.owneRequestIds,
  userCtx: state.userCtx
})

const mapDispatch = dispatch => ({
  setRequestSync: ids => dispatch(setRequestSync(ids))
})

export default connect(mapState, mapDispatch)(RequestActor)
