import React from 'react'
import PropTypes from 'prop-types'
import { WithContext as ReactTags } from 'react-tag-input'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faPlus } from '@fortawesome/free-solid-svg-icons'

import { delimiters } from './utils'

class HeadlinerForm extends React.Component {
    constructor(props) {
        super(props)
        this.handleChangeHeadliner = this.handleChangeHeadliner.bind(this)
        this.handleChangeHeadlinerLinks = this.handleChangeHeadlinerLinks.bind(
            this
        )
        this.handleAddition = this.handleAddition.bind(this)
        this.handleDeleteHeadlinerGenre = this.handleDeleteHeadlinerGenre.bind(
            this
        )
        this.addHeadlinerLinks = this.addHeadlinerLinks.bind(this)
    }

    addHeadlinerLinks() {
        let headlinerLinks = this.props.headlinerLinks.concat(['', ''])
        this.props.updateState({ headlinerLinks })
    }

    handleChangeHeadliner(event) {
        this.props.updateState({ headliner: event.target.value })
    }

    handleChangeHeadlinerLinks(index) {
        return (event) => {
            let headlinerLinks = this.props.headlinerLinks.concat([])
            headlinerLinks[index] = event.target.value
            this.props.updateState({ headlinerLinks })
        }
    }

    handleAddition(key) {
        return (tag) => {
            if (!key) {
                return this.props.updateState({
                    headlinerGenre: this.props.headlinerGenre.concat([tag]),
                })
            }
        }
    }

    handleDeleteHeadlinerGenre(i) {
        const { headlinerGenre } = this.props
        this.props.updateState({
            headlinerGenre: headlinerGenre.filter((tag, index) => index !== i),
        })
    }

    render() {
        const { headliner, headlinerGenre, headlinerLinks, genres } = this.props
        return (
            <>
                <Col xs={12} md={6}>
                    <Form.Group id="headliner">
                        <Form.Label>
                            Headliner <FontAwesomeIcon icon={faAsterisk} />
                        </Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={headliner}
                            name="headliner"
                            onChange={this.handleChangeHeadliner}
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                    <Form.Group>
                        <Form.Label>
                            Headliner Genre{' '}
                            <FontAwesomeIcon icon={faAsterisk} />
                        </Form.Label>
                        {
                            <ReactTags
                                tags={headlinerGenre}
                                inline
                                required
                                inlinePosition="after"
                                suggestions={genres}
                                allowDragDrop={false}
                                handleDelete={this.handleDeleteHeadlinerGenre}
                                handleAddition={this.handleAddition()}
                                delimiters={delimiters}
                            />
                        }
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Form.Group>
                        <Form.Label>Headliner Links</Form.Label>
                        <Row>
                            <Col md={10}>
                                <Row>
                                    {headlinerLinks.map((item, index) => (
                                        <Col xs={12} md={6} key={index}>
                                            <Form.Control
                                                type="text"
                                                onChange={this.handleChangeHeadlinerLinks(
                                                    index
                                                )}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                            <Col md={2} className="add-linkt-btn-container">
                                <Button
                                    className="btn-block add-content-btn"
                                    variant="secondary"
                                    onClick={this.addHeadlinerLinks}
                                >
                                    <FontAwesomeIcon icon={faPlus} /> Links
                                </Button>
                            </Col>
                        </Row>
                    </Form.Group>
                </Col>
            </>
        )
    }
}

HeadlinerForm.propTypes = {
    headliner: PropTypes.string.isRequired,
    updateState: PropTypes.func.isRequired,
    headlinerLinks: PropTypes.arrayOf(PropTypes.string).isRequired,
    headlinerGenre: PropTypes.array,
    genres: PropTypes.array,
}

export default HeadlinerForm
