import React, { Component } from 'react'
import Container from "react-bootstrap/Container"
import { Form, Button } from 'react-bootstrap'
import Datetime from 'react-datetime'
import uuidv1 from 'uuid/v1'
import { Col, Row } from 'react-bootstrap'

import { WithContext as ReactTags } from 'react-tag-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'

const genres = [
    { id: 'genre:punk', text: 'Punk' },
    { id: 'genre:metal', text: 'Metal' },
    { id: 'genre:death_metal', text: 'Death Metal' },
    { id: 'genre:stoner', text: 'Stoner' }
]

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class AddShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            date: null,
            venue: '',
            venueAdress: '',
            headliner: '',
            headlinerGenre: [],
            headlinerLinks: [],
            support: {
                [uuidv1()]: {
                    name: '',
                    genres: [],
                    links: []
                }
            }
        }
        this.handleDeleteHeadlinerGenre = this.handleDeleteHeadlinerGenre.bind(this)
        this.handleDeleteHeadlinerLinks = this.handleDeleteHeadlinerLinks.bind(this)
        this.handleDeleteSupportGenre = this.handleDeleteSupportGenre.bind(this)
        this.handleDeleteSupportLinks = this.handleDeleteSupportLinks.bind(this)
        this.handleAddition = this.handleAddition.bind(this)
        this.handleChangeTextInput = this.handleChangeTextInput.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeSupport = this.handleChangeSupport.bind(this)
        this.addSupport = this.addSupport.bind(this)
        this.deletSupport = this.deletSupport.bind(this)
        this.handleAddShow = this.handleAddShow.bind(this)
    }

    handleAddShow(e) {
        console.log(this.state)
        const { name, venue, venueAdress, headliner, headlinerGenre, headlinerLinks, date, support } = this.state
        const event = {
            name,
            venue,
            venueAdress,
            headliner,
            headlinerGenre,
            headlinerLinks,
            date: date?date.format():"",
            support
        }
        // this.props.addEvent(event)
        console.log(event)
    }

    handleDeleteHeadlinerGenre = i => {
        const { headlinerGenre } = this.state
        this.setState({
            headlinerGenre: headlinerGenre.filter((tag, index) => index !== i)
        })
    }

    handleDeleteHeadlinerLinks = i => {
        const { headlinerLinks } = this.state
        this.setState({
            headlinerLinks: headlinerLinks.filter((tag, index) => index !== i)
        })
    }

    handleDeleteSupportGenre = key => i => {
        let support = Object.assign(this.state.support, {})
        support[key].genres = support[key].genres.filter((tag, index) => index !== i)
        this.setState({ support })

    }

    handleDeleteSupportLinks = key => i => {
        let support = Object.assign(this.state.support, {})
        support[key].links = support[key].links.filter((tag, index) => index !== i)
    }

    handleAddition = key => tag => {
        if (!key) {
            return this.setState({ headlinerGenre: this.state.headlinerGenre.concat([tag]) });
        }
        let support = Object.assign(this.state.support, {})
        support[key].genres = support[key].genres.concat([tag])
        this.setState({ support })
    }

    handleChangeTextInput(event) {
        const { currentTarget } = event
        this.setState({
            [currentTarget.name]: currentTarget.value
        })
    }

    handleChangeDate(date) {
        this.setState({ date })
    }

    handleChangeSupport = key => event => {
        const support = Object.assign(this.state.support, {})
        support[key].name = event.currentTarget.value
        this.setState({ support })
    }



    addSupport() {
        const support = Object.assign(this.state.support, {})
        support[uuidv1()] = {
            name: '',
            genres: []
        }
        this.setState({ support })
    }

    deletSupport = key => event => {
        let support = Object.assign(this.state.support, {})
        delete support[key]
        this.setState({ support })
    }

    handleSubmit(event) {
        event.preventDefault()
        const { name, date, headliner, headlinerGenre, support } = this.state
        const artist_details = [
            {
                name: headliner,
                genres: headlinerGenre,
                links: []
            }
        ]
        Object.keys(support).forEach(key => {
            artist_details.push(support[key])
        })
        const data = {
            name,
            date,
            artist_details
        }
        if (support && Object.keys(support).length > 0) {
            data.support = Object.keys(support).map(key => support[key].name)
        }
    }

    render() {
        const { name, venue, headlinerGenre, venueAdress, date, headliner, support } = this.state
        return (
            <Container>
                <h1>Good Night Couch Side | Add Show</h1>
                {/* TODO:  show only if not editor */}
                <p>That is the place where you can add your show. It will send to our database and will checked by one of our editor</p>

                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col xs={12} md={8}>
                            <Form.Group id='name'>
                                <Form.Label>Show name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}
                                    name='name'
                                    onChange={this.handleChangeTextInput}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Group id='date'>
                                <Form.Label>Date <FontAwesomeIcon icon={faAsterisk} /></Form.Label>
                                <Datetime
                                    required
                                    value={date}
                                    onChange={this.handleChangeDate} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Group id='venue'>
                                <Form.Label>Venue name <FontAwesomeIcon icon={faAsterisk} /></Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    value={venue}
                                    name='venue'
                                    onChange={this.handleChangeTextInput}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={8}>
                            <Form.Group id='venueAdress'>
                                <Form.Label>Venue adress (Hellstreet 666, 13120 Berlin)</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={venueAdress}
                                    name='venueAdress'
                                    onChange={this.handleChangeTextInput}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6}>
                            <Form.Group id='headliner'>
                                <Form.Label>Headliner <FontAwesomeIcon icon={faAsterisk} /></Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    value={headliner}
                                    name='headliner'
                                    onChange={this.handleChangeTextInput}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label>Headliner Genre <FontAwesomeIcon icon={faAsterisk} /></Form.Label>
                                {<ReactTags
                                    tags={headlinerGenre}
                                    inline
                                    required
                                    inlinePosition="after"
                                    suggestions={genres}
                                    handleDelete={this.handleDeleteHeadlinerGenre}
                                    handleAddition={this.handleAddition()}
                                    delimiters={delimiters} />}
                            </Form.Group>
                        </Col>
                        <Col md={12}>

                            <Form.Group>
                                <Form.Label>Headliner Links</Form.Label>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <Form.Control
                                            type="text"
                                            onChange={this.handleChangeTextInput}
                                        />
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Control
                                            type="text"
                                            onChange={this.handleChangeTextInput}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col md={2} xs={3}>
                            <Button className="btn-block add-show-btn"
                                variant='primary' onClick={this.addSupport}>
                                <FontAwesomeIcon icon={faPlus} /> Support
                            </Button>
                        </Col>
                        <Col >
                            <hr />
                        </Col>
                        {Object.keys(support).map((key, index, array) => {
                            const item = support[key]
                            return (
                                <Col md={12} key={key}>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <Form.Group id={key}>
                                                <Form.Label>Support {index + 1}</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={item.name}
                                                    onChange={this.handleChangeSupport(key)}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Form.Group>
                                                <Form.Label>{`Support ${index + 1} Genre`}</Form.Label>
                                                <Row>
                                                    <Col md={10} xs={9}>
                                                        {<ReactTags
                                                            tags={item.genres}
                                                            inline
                                                            inlinePosition="after"
                                                            suggestions={genres}
                                                            handleDelete={this.handleDeleteSupportGenre(key)}
                                                            handleAddition={this.handleAddition(key)}
                                                            delimiters={delimiters} />}
                                                    </Col>
                                                    <Col md={2} xs={3}>
                                                        <Button className="btn-block"
                                                            variant='danger'
                                                            onClick={this.deletSupport(key)}
                                                            disabled={array.length <= 1}>
                                                            <FontAwesomeIcon icon={faTimes} />
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group id={key}>
                                                <Form.Label>{`Support ${index + 1} Genre`}</Form.Label>
                                                <Row>
                                                    <Col xs={12} md={6}>
                                                        <Form.Control
                                                            type="text"
                                                            value={item.name}
                                                            onChange={this.handleChangeSupport(key)}
                                                        />
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <Form.Control
                                                            type="text"
                                                            value={item.name}
                                                            onChange={this.handleChangeSupport(key)}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <hr />
                                </Col>
                            )
                        })}
                        <Col>
                            <Button variant='primary' type='submit' onClick={this.handleAddShow}>
                                Add that fucking Show!
                        </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }
}

export default AddShow
