import React from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  FormControl,
  FormLabel,
  Button,
  FormGroup,
  Container,
  Row,
  Col,
  Alert
} from 'react-bootstrap'
import Feedback from 'react-bootstrap/Feedback'

class LogInForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      validated: false
    }
    this.handleOnCange = this.handleOnCange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  isConfimPasswordValid(confirmPassword, newPassword) {
    if (!confirmPassword || confirmPassword.trim() === '') return false
    if (newPassword !== confirmPassword) return false
    return true
  }

  checkIsValided(state) {
    const { oldPassword, newPassword, confirmPassword } = state
    if (!oldPassword || oldPassword.trim() === '') return false
    if (!newPassword || newPassword.trim() === '') return false
    if (!confirmPassword || confirmPassword.trim() === '') return false
    if (newPassword !== confirmPassword) return false
    return true
  }

  handleOnCange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    event.stopPropagation()
    if (!this.checkIsValided(this.state)) {
      this.setState({ validated: true })
      return console.log('not')
    }
    const {oldPassword, newPassword} = this.state
    this.props.changePasswordRequest({oldPassword, newPassword})
  }

  render() {
    const { validated, oldPassword, newPassword, confirmPassword } = this.state
    const { loading, error } = this.props
    console.log(validated)
    return (
      <Container>
        <h1>Change your password</h1>
        <Row className="justify-content-md-center">
          <Col xs lg="4">
            <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
              <Col xs={12}>
                <FormGroup>
                  <FormLabel>old password</FormLabel>
                  <FormControl
                    type="password"
                    name="oldPassword"
                    onChange={this.handleOnCange}
                    value={oldPassword}
                    placeholder="enter your old password"
                    required
                  />
                  <Feedback type="invalid">please enter a password</Feedback>
                </FormGroup>
              </Col>
              <Col xs={12}>
                <FormGroup>
                  <FormLabel>new password</FormLabel>
                  <FormControl
                    type="password"
                    name="newPassword"
                    onChange={this.handleOnCange}
                    value={newPassword}
                    placeholder="enter your new password"
                    required
                  />
                  <Feedback type="invalid">please enter a password</Feedback>
                </FormGroup>
              </Col>
              <Col xs={12}>
                <FormGroup>
                  <FormLabel>confirm password</FormLabel>
                  <FormControl
                    type="password"
                    name="confirmPassword"
                    onChange={this.handleOnCange}
                    value={confirmPassword}
                    placeholder="enter your new password"
                    required
                    isInvalid={validated && !this.isConfimPasswordValid(oldPassword, newPassword)}
                    isValid={this.isConfimPasswordValid(oldPassword, newPassword)}
                  />
                  <Feedback type="invalid">please enter a password</Feedback>
                </FormGroup>
              </Col>
              {error && <Alert variant="danger">{error.message}</Alert>}
              <Col xs={12}>
                <Button variant="primary" type="submit">
                  {loading ? <span>loding...</span> : <span>change password</span>}
                </Button>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

LogInForm.propTypes = {
  changePasswordRequest: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.any
}

export default LogInForm
