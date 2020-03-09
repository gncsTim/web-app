import React, { useState } from 'react'
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

const LogInForm = ({ handleLoginRequest, loading, error }) => {
  const [validated, setValidated] = useState(false)
  const [email, setLoginEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    if (form.checkValidity() === false) {
      setValidated(true)
      return console.log('test')
    }
    handleLoginRequest({ email, password })
    setPassword('')
  }
  return (
    <Container>
      <h1> Editor login</h1>
      <Row className="justify-content-md-center">
        <Col xs lg="4">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Col xs={12}>
              <FormGroup controlId="validationEmail">
                <FormLabel>email</FormLabel>
                <FormControl
                  type="text"
                  onChange={e => setLoginEmail(e.target.value)}
                  value={email}
                  placeholder="enter your email"
                  required
                />
                <Feedback type="invalid">please enter a email</Feedback>
              </FormGroup>
            </Col>
            <Col xs={12}>
              <FormGroup>
                <FormLabel>password</FormLabel>
                <FormControl
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  placeholder="enter your password"
                  required
                />
                <Feedback type="invalid">please enter a password</Feedback>
              </FormGroup>
            </Col>
            {error && <Alert variant="danger">{error.message}</Alert>}
            <Col xs={12}>
              <Button variant="primary" type="submit">
                {loading ? <span>loding...</span> : <span>login</span>}
              </Button>
            </Col>
            <Col xs={12}>
              <hr />
              <p className="text-center">Version: 0.0.1.2</p>
            </Col>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

LogInForm.propTypes = {
  handleLoginRequest: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.any
}

export default LogInForm
