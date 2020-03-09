import { connect } from 'react-redux'

import ChangePassword from '../component'
import { changePasswordRequest } from '../action'

const mpaState = state => ({
  loading: state.changePassword.loading
})

const mapDispatch = dispatch => ({
  changePasswordRequest: data => dispatch(changePasswordRequest(data))
})

export default connect(mpaState, mapDispatch)(ChangePassword)
