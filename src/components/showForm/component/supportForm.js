import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import uuidv1 from 'uuid/v1'

import GenresForm from './genresForm'

class SupportForm extends React.Component {
    constructor(props) {
        super(props)
        this.handleChangeSupport = this.handleChangeSupport.bind(this)
        this.addSupportLinks = this.addSupportLinks.bind(this)
        this.handleChangeSupportLinks = this.handleChangeSupportLinks.bind(this)
        this.addSupport = this.addSupport.bind(this)
    }

    handleChangeSupport(key) {
        return (event) => {
            const support = Object.assign(this.props.support, {})
            let value = event.currentTarget.value
            support[key].name = value
            this.props.updateState({ support })
        }
    }

    addSupportLinks(key) {
        return () => {
            const support = JSON.parse(JSON.stringify(this.props.support))
            support[key].links = support[key].links.concat(['', ''])
            this.props.updateState({ support })
        }
    }

    addSupport() {
        const support = Object.assign(this.props.support, {})
        support[uuidv1()] = {
            name: '',
            genres: [],
            links: ['', ''],
        }
        this.props.updateState({ support })
    }

    handleChangeSupportLinks(key, index) {
        return (event) => {
            const support = JSON.parse(JSON.stringify(this.props.support))
            support[key].links[index] = event.target.value
            this.props.updateState({ support })
        }
    }

    handleChangeSupportGenre(key) {
        return (genres) => {
            const support = JSON.parse(JSON.stringify(this.props.support))
            support[key].genres = genres
            this.props.updateState({ support })
        }
    }

    render() {
        const { support } = this.props
        return (
            <>
                {Object.keys(support).map((key, index, array) => {
                    const { name, links, genres } = support[key]
                    return (
                        <Col md={12} key={key}>
                            <hr />
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group id={key}>
                                        <Form.Label>
                                            Support {index + 1}
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={name}
                                            onChange={this.handleChangeSupport(
                                                key
                                            )}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group>
                                        <Form.Label>{`Support ${
                                            index + 1
                                        } Genre`}</Form.Label>
                                        <Row>
                                            <Col md={10} xs={9}>
                                                <GenresForm
                                                    selected={genres}
                                                    onChange={this.handleChangeSupportGenre(
                                                        key
                                                    )}
                                                />
                                            </Col>
                                            <Col md={2} xs={3}>
                                                <Button
                                                    className="btn-block"
                                                    variant="danger"
                                                    /* onClick={this.deletSupport(key)} */
                                                    disabled={array.length}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTimes}
                                                    />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>{`Support ${
                                            index + 1
                                        } Links`}</Form.Label>
                                        <Row>
                                            <Col md={10}>
                                                <Row>
                                                    {links.map(
                                                        (item, index) => (
                                                            <Col
                                                                xs={12}
                                                                md={6}
                                                                key={index}
                                                            >
                                                                <Form.Control
                                                                    type="text"
                                                                    value={
                                                                        item.name
                                                                    }
                                                                    onChange={this.handleChangeSupportLinks(
                                                                        key,
                                                                        index
                                                                    )}
                                                                />
                                                            </Col>
                                                        )
                                                    )}
                                                </Row>
                                            </Col>
                                            <Col
                                                md={2}
                                                className="add-linkt-btn-container"
                                            >
                                                <Button
                                                    className="btn-block add-content-btn"
                                                    variant="secondary"
                                                    onClick={this.addSupportLinks(
                                                        key
                                                    )}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faPlus}
                                                    />{' '}
                                                    Links
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    )
                })}
                <Col md={2} xs={6}>
                    <Form.Group>
                        <Button
                            className="btn-block add-content-btn"
                            variant="secondary"
                            onClick={this.addSupport}
                        >
                            <FontAwesomeIcon icon={faPlus} /> Support
                        </Button>
                    </Form.Group>
                </Col>
            </>
        )
    }
}

SupportForm.propTypes = {
    updateState: PropTypes.func.isRequired,
    support: PropTypes.shape({
        name: PropTypes.string,
        links: PropTypes.array,
        genres: PropTypes.array,
    }),
}

export default SupportForm
