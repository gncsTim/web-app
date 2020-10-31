import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'react-bootstrap'
import Moment from 'react-moment'
import { eventShape } from 'gncsPropTypes'

class EventDetail extends React.Component {
    componentDidUpdate() {
        const { event, isEventListEmpty, redirctToPageNotFound } = this.props
        if (!event && !isEventListEmpty) redirctToPageNotFound()
    }

    render() {
        const { event } = this.props
        if (!event) return <div>not found</div>
        return (
            <div className="event-detail">
                <Col>
                    <div className="event-head">
                        <div className="event-headline">
                            <h2>
                                <Moment format="DD.MM.YYYY - HH.mm">
                                    {event.date}
                                </Moment>
                            </h2>
                        </div>
                        <div className="event-headline">
                            <h2>
                                {event.name && event.name.trim() !== ''
                                    ? event.name
                                    : event.headliner}
                            </h2>
                        </div>
                        <div className="event-headline">
                            <h2>{event.venue}</h2>
                        </div>
                    </div>

                    <Row>
                        <Col className="event-body">
                            {event.presale &&
                                `Presale: ${event.presale} ${
                                    event.atTheDoor ? ', ' : ''
                                } `}
                            {event.atTheDoor &&
                                `Price at the Door: ${event.atTheDoor}`}
                            <br />
                            <br />
                            <p>{event.description}</p>
                            {event.facebookLink &&
                            event.facebookLink.trim() !== '' ? (
                                    <>
                                        <a
                                            href={event.facebookLink}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            Facebook Event
                                        </a>
                                        <br />
                                        <br />
                                        <br />
                                    </>
                                ) : (
                                    ''
                                )}
                            {event.artist_details.map(
                                (artist_details, index) => (
                                    <div key={index}>
                                        <h2>{artist_details.name}</h2>
                                        <p>
                                            Genre:{' '}
                                            {artist_details.genres.join(', ')}
                                        </p>
                                        <ul>
                                            {artist_details.links.map(
                                                (link, index) => (
                                                    <li key={index}>
                                                        <a
                                                            href={link}
                                                            rel="noopener noreferrer"
                                                            target="_blank"
                                                        >
                                                            {link}
                                                        </a>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )
                            )}
                        </Col>
                    </Row>
                </Col>
            </div>
        )
    }
}

EventDetail.propTypes = {
    event: PropTypes.shape(eventShape),
    handleClick: PropTypes.func,
}

export default EventDetail
