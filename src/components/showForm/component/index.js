import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Col, Row } from 'react-bootstrap'
import uuidv1 from 'uuid/v1'
import crypto from 'crypto'
import ksuid from 'ksuid'

import { isAdminOrEditor } from 'components/user/utils'
import SupportForm from './supportForm'
import HeadlinerForm from './headlinerForm'
import MetaShowForm from './metaShowForm'

class ShowForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            date: null,
            venue: '',
            presale: '',
            atTheDoor: '',
            facebookLink: '',
            description: '',
            venueAdress: '',
            headliner: '',
            headlinerGenre: [],
            headlinerLinks: ['', ''],
            support: {
                [uuidv1()]: {
                    name: '',
                    genres: [],
                    links: ['', ''],
                },
            },
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.updateState = this.updateState.bind(this)
    }

    componentDidMount() {
        this.props.resetAddEventRequest()
        this.props.getAllVenues()
        this.props.getAllGenres()
    }

    updateState(obj) {
        this.setState(obj)
    }

    handleSubmit(event) {
        event.preventDefault()
        const { userCtx, addEventRemote, addEvent } = this.props
        const {
            name,
            date,
            presale,
            atTheDoor,
            facebookLink,
            description,
            headliner,
            headlinerGenre,
            venue,
            headlinerLinks,
        } = this.state

        const id = ksuid.fromParts(date.valueOf(), crypto.randomBytes(16))

        // return
        const artist_details = [
            {
                name: headliner,
                genres: headlinerGenre.map((item) => item.text),
                links: headlinerLinks,
            },
        ]
        const support = JSON.parse(JSON.stringify(this.state.support))
        Object.keys(support).forEach((key) => {
            const item = support[key]
            item.genres = item.genres.map((item) => item.text)

            if (item && item.name.trim() !== '') artist_details.push(item)
        })
        const data = {
            _id: id.string,
            headliner,
            presale,
            atTheDoor,
            facebookLink,
            description,
            genres: headlinerGenre.map((item) => item.text),
            type: 'event',
            name,
            date: date.toISOString(),
            artist_details,
            venue,
        }
        if (support && Object.keys(support).length > 0) {
            data.support = Object.keys(support)
                .map((key) => support[key].name)
                .filter((item) => item && item.trim() !== '')
        }
        if (userCtx && isAdminOrEditor(userCtx.roles)) {
            return addEventRemote(data)
        }

        addEvent(data)
    }

    render() {
        const { venues, genres, isAddShow } = this.props
        const {
            name,
            venue,
            presale,
            atTheDoor,
            facebookLink,
            description,
            headlinerGenre,
            venueAdress,
            date,
            headliner,
            support,
            headlinerLinks,
        } = this.state
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <MetaShowForm
                        eventName={name}
                        updateState={this.updateState}
                        eventFacebookLink={facebookLink}
                        eventDate={date}
                        venue={venue}
                        venues={venues}
                        venueAdress={venueAdress}
                        presale={presale}
                        atTheDoor={atTheDoor}
                        eventDescription={description}
                    />
                    <HeadlinerForm
                        headliner={headliner}
                        updateState={this.updateState}
                        headlinerLinks={headlinerLinks}
                        headlinerGenre={headlinerGenre}
                        genres={genres}
                    />
                    <SupportForm support={support} updateState={this.updateState} />
                    <Col>
                        <hr />
                        <Button className='float-right' variant='primary' type='submit'>
                            {isAddShow ? 'Add that fucking Show!' : 'Edite that fucking Show!'}
                        </Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

ShowForm.propTypes = {
    genres: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ),
    venues: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            street: PropTypes.string,
            zip: PropTypes.number,
            city: PropTypes.string,
        })
    ),
    isAddShow: PropTypes.bool,
    userCtx: PropTypes.shape({
        name: PropTypes.string,
        roles: PropTypes.arrayOf(PropTypes.string),
    }),
    addEventRemote: PropTypes.func.isRequired,
    addEvent: PropTypes.func.isRequired,
    resetAddEventRequest: PropTypes.func.isRequired,
    getAllVenues: PropTypes.func.isRequired,
    getAllGenres: PropTypes.func.isRequired,
}

export default ShowForm
