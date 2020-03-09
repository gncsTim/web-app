import { connect } from 'react-redux'

import ChangePassword from '../component'
import { changePasswordRequest } from '../action'

const mpaState = state => ({})

const mapDispatch = dispatch => ({
  changePasswordRequest: data =>
    dispatch(changePasswordRequest(data))
})

export default connect(mpaState, mapDispatch)(ChangePassword)
