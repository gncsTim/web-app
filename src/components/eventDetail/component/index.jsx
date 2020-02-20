import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row, Container } from 'react-bootstrap'
import Moment from 'react-moment'

import {eventShape} from 'gncsPropTypes'

const EventDetail = ({ event }) => {
  if (!event) return null
  return (
    <Row className="event-detail">
      <Col>
        <div className="event-head">
          <div className="event-headline">
            <h2>
              <Moment format="DD.MM.YYYY - HH.mm">{event.date}</Moment>
            </h2>
          </div>
          <div className="event-headline">
            <h2>{event.name}</h2>
          </div>
          <div className="event-headline">
            <h2>{event.venue}</h2>
          </div>
        </div>

        <Col className="event-body">
          {event.entrance_vvk &&
            `Entrance VVK: ${event.entrance_vvk} ${event.entrance_ak ? ', ' : ''} `}
          {event.entrance_ak && `Entrance AK: ${event.entrance_ak}`}
          <br />
          <br />
          <p>{event.event_description}</p>
          <br />
          {event.artist_details.map((artist_details, index) => (
            <div key={index}>
              <h2>{artist_details.name}</h2>
              <p>Genre: {artist_details.genres.join(', ')}</p>
              <ul>
                {artist_details.links.map((link, index) => (
                  <li key={index}>
                    <a href={link}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Col>
      </Col>
    </Row>
  )
}

EventDetail.propTypes = {
  event: PropTypes.shape(eventShape),
  handleClick: PropTypes.func
}

export default EventDetail
