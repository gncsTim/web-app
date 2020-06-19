import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import GenresForm from './genresForm'

class SupportForm extends React.Component {
  render() {
    const { key, index, links, name, arraylength } = this.props
    return (
      <Row>
        <Col xs={12} md={6}>
          <Form.Group id={key}>
            <Form.Label>Support {index + 1}</Form.Label>
            {/* <Form.Control type="text" value={name} onChange={this.handleChangeSupport(key)} /> */}
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>{`Support ${index + 1} Genre`}</Form.Label>
            <Row>
              <Col md={10} xs={9}>
                <GenresForm />
              </Col>
              <Col md={2} xs={3}>
                <Button
                  className="btn-block"
                  variant="danger"
                  /* onClick={this.deletSupport(key)} */
                  disabled={arraylength}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Col>
        {/* <Col>
          <Form.Group>
            <Form.Label>{`Support ${index + 1} Links`}</Form.Label>
            <Row>
              <Col md={10}>
                <Row>
                  {links.map((item, index) => (
                    <Col xs={12} md={6} key={index}>
                      <Form.Control
                        type="text"
                        value={item.name}
                        onChange={this.handleChangeSupportLinks(key, index)}
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col md={2} className="add-linkt-btn-container">
                <Button
                  className="btn-block add-content-btn"
                  variant="secondary"
                  onClick={this.addSupportLinks(key)}
                >
                  <FontAwesomeIcon icon={faPlus} /> Links
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Col> */}
      </Row>
    )
  }
}

SupportForm.propTypes = {
  key: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  links: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string,
  arraylength: PropTypes.number.isRequired
}

export default SupportForm
