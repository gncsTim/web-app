import React from 'react'
import PropTypes from 'prop-types'
import momentPropTypes from 'react-moment-proptypes'
import { Col, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'
import Datetime from 'react-datetime'
import { Typeahead } from 'react-bootstrap-typeahead'

class MetaShowForm extends React.Component {
    constructor(props) {
        super(props)
        this.handleChangeTextInput = this.handleChangeTextInput.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleChangeVenue = this.handleChangeVenue.bind(this)
        this.handleSelectVenue = this.handleSelectVenue.bind(this)
    }

    handleChangeTextInput(e) {
        const { name, value } = e.target
        this.props.updateState({ [name]: value })
    }

    handleChangeDate(date) {
        this.props.updateState({ date })
    }

    handleChangeVenue(venue) {
        this.props.updateState({ venue })
    }

    handleSelectVenue(venues) {
        if (!venues || venues.length === 0) return
        const venue = venues[0]
        this.props.updateState({
            venue: venue.label,
            venueAdress: `${venue.street}, ${venue.zip} ${venue.city}`,
        })
    }

    render() {
        const {
            eventName,
            eventDate,
            eventFacebookLink,
            venues,
            venueAdress,
            presale,
            atTheDoor,
            eventDescription
        } = this.props
        return (
            <>
                <Col xs={12} md={5}>
                    <Form.Group id='name'>
                        <Form.Label>Show name</Form.Label>
                        <Form.Control
                            type='text'
                            value={eventName}
                            name='name'
                            onChange={this.handleChangeTextInput}
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} md={3}>
                    <Form.Group id='date'>
                        <Form.Label>
                            Date <FontAwesomeIcon icon={faAsterisk} />
                        </Form.Label>
                        <Datetime required value={eventDate} onChange={this.handleChangeDate} />
                    </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                    <Form.Group id='facebookLink'>
                        <Form.Label>Link to facebook event</Form.Label>
                        <Form.Control
                            type='text'
                            value={eventFacebookLink}
                            name='facebookLink'
                            onChange={this.handleChangeTextInput}
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} md={3}>
                    <Form.Group id='venue'>
                        <Form.Label>
                            Venue name <FontAwesomeIcon icon={faAsterisk} />
                        </Form.Label>
                        <Typeahead
                            id='input-venue-name'
                            onChange={this.handleSelectVenue}
                            onInputChange={this.handleChangeVenue}
                            options={venues}
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} md={5}>
                    <Form.Group id='venueAdress'>
                        <Form.Label>Venue adress (Hellstreet 666, 13120 Berlin)</Form.Label>
                        <Form.Control
                            type='text'
                            value={venueAdress}
                            name='venueAdress'
                            onChange={this.handleChangeTextInput}
                        />
                    </Form.Group>
                </Col>
                <Col xs={6} md={2}>
                    <Form.Group id='presale'>
                        <Form.Label>Presal Price</Form.Label>
                        <Form.Control
                            type='text'
                            value={presale}
                            name='presale'
                            onChange={this.handleChangeTextInput}
                        />
                    </Form.Group>
                </Col>
                <Col xs={6} md={2}>
                    <Form.Group id='atTheDoor'>
                        <Form.Label>Door Price</Form.Label>
                        <Form.Control
                            type='text'
                            value={atTheDoor}
                            name='atTheDoor'
                            onChange={this.handleChangeTextInput}
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} md={12}>
                    <Form.Group id='description'>
                        <Form.Label>Event description</Form.Label>
                        <Form.Control
                            type='textarea'
                            as='textarea'
                            rows='2'
                            value={eventDescription}
                            name='description'
                            onChange={this.handleChangeTextInput}
                        />
                    </Form.Group>
                </Col>
            </>
        )
    }
}

MetaShowForm.propTypes = {
    updateState: PropTypes.func.isRequired,
    eventName: PropTypes.string,
    eventDate: momentPropTypes.momentObj,
    eventFacebookLink: PropTypes.string,
    venues: PropTypes.array,
    venueAdress: PropTypes.string,
    presale: PropTypes.string,
    atTheDoor: PropTypes.string,
    eventDescription: PropTypes.string,
    venue: PropTypes.string
}

MetaShowForm.defaultProps = {
    venues: [],
}

export default MetaShowForm
