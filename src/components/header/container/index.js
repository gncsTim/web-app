import { connect } from 'react-redux'

import Header from '../component'
import { getSession, logout } from 'components/user/action'

const mapState = (state) => ({
    userCtx: state.userCtx,
})

const mapDispatch = (dispatch) => ({
    handleGetSession: () => dispatch(getSession()),
    handleLogout: () => dispatch(logout()),
})
const connector = connect(mapState, mapDispatch)

export default connector(Header)
