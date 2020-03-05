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
          {event.presale &&
            `Presale: ${event.presale} ${event.atTheDoor ? ', ' : ''} `}
          {event.atTheDoor && `Price at the Door: ${event.atTheDoor}`}
          <br />
          <br />
          <p>{event.description}</p>
          <a href={event.facebookLink} target="_blank">Facebook Event</a>
          <br />
          <br />
          <br />

          {event.artist_details.map((artist_details, index) => (
            <div key={index}>
              <h2>{artist_details.name}</h2>
              <p>Genre: {artist_details.genres.join(', ')}</p>
              <ul>
                {artist_details.links.map((link, index) => (
                  <li key={index}>
                    <a href={link} target="_blank">{link}</a>
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
