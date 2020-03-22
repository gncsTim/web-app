import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'react-bootstrap'
import moment from 'moment'

import EventFilter from 'components/eventFilter/container'
import DisplayDates from './displayDates'
import EventListItem from './eventListItem'


const EventList = ({ eventList }) => {
  const today = moment();

  if (eventList.length === 0) return null
  const sortEvents = {}
  eventList.forEach( event => {
    event.dateKey = moment(event.date).format('DD.MM.YYYY')
    if (sortEvents[event.dateKey]){
      return sortEvents[event.dateKey].push(event)
    }
      sortEvents[event.dateKey] = [event]
    } )
  return (
    <Col className="event-list">
      <h1>Next shows</h1>
      <EventFilter />
      {Object.keys(sortEvents).map(key => {
        const events = sortEvents[key]
        return (
        <div key={key}>
          <Row>
            <div className="event-list-date">
                <DisplayDates eventDate={key} today={today} />

            </div>
          </Row>
          { events.map((event, index) => (
            <EventListItem key={index} event={event} />
          ))}
        </div>
      )})}
    </Col>
  )
}

EventList.propTypes = {
  eventList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      date: PropTypes.string,
      name: PropTypes.string,
      headliner: PropTypes.string.isRequired,
      genres: PropTypes.arrayOf(PropTypes.string)
    })
  )
}

export default EventList
