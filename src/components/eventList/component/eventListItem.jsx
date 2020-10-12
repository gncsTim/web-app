import React from 'react'
import PropTypes from 'prop-types'
import { eventShape } from 'gncsPropTypes'
import { Col, Row } from 'react-bootstrap'
import eventListImage from 'assets/img/gncs_eventlist_img.jpg'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import EventTitle from './eventTitle'

const EventListItem = ({ event }) => (
    <Link to={'/EventDetail/' + event._id}>
        <div className="list-event">
            <Row>
                <Col xs={12} md={2} className="event-list-img">
                    <img src={eventListImage} alt="default event list logo" />
                </Col>
                <Col xs={12} md={5}>
                    <EventTitle title={event.name} headliner={event.headliner} />
                    <ul>
                        {event.support.map((support, index, array) => (
                            <li key={`support-list-${index}`}>
                                {support} {index === array.length - 1 ? '' : '-'}
                            </li>
                        ))}
                    </ul>
                </Col>
                <Col md={3} className="d-none d-sm-block">
                    <h2>{event.venue}</h2>
                    <Moment format="HH:mm | DD.MM.YYYY">{event.date}</Moment>
                </Col>
                <Col xs={12} className="d-block d-sm-none">
                    <h3>
                        <span className="float-left">{event.venue}</span>
                        <span className="float-right">
                            <Moment format="HH:mm | DD.MM.YYYY">{event.date}</Moment>
                        </span>
                    </h3>
                </Col>
                <Col xs={12} md={2}>
                    <p>
                        {event.presale && `Presale: ${event.presale} ${event.atTheDoor ? ', ' : ''} `}
                        {event.atTheDoor && `Price at the Door: ${event.atTheDoor}`}
                    </p>
                    <p>
                        {Array.from(
                            new Set(
                                [].concat.apply(
                                    [],
                                    event.artist_details.map((item) => item.genres)
                                )
                            )
                        ).join(', ')}
                    </p>
                </Col>
            </Row>
        </div>
    </Link>
)

EventListItem.propTypes = {
    event: PropTypes.shape(eventShape),
}

export default EventListItem
