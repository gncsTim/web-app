import { connect } from 'react-redux'

import RequestActor from './component'
import { setRequestSync } from './action'

const mapState = state => ({
  ownRequestIds: state.ownRequestIds,
  userCtx: state.userCtx
})

const mapDispatch = dispatch => ({
  setRequestSync: ids => dispatch(setRequestSync(ids))
})

export default connect(mapState, mapDispatch)(RequestActor)
