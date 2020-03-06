import { connect } from 'react-redux'

import LogInForm from '../component'
import { loginRequest } from '../action'

const mapState = state => ({
  loading: state.loginState.loading,
  error: state.loginState.error
})

const mapDispatch = dispatch => ({
  handleLoginRequest: data => dispatch(loginRequest(data))
})

const connector = connect(mapState, mapDispatch)

export default connector(LogInForm)
