import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'react-bootstrap'
import moment from 'moment'
import EventFilter from 'components/eventFilter/container'
import DisplayDates from './displayDates'
import EventListItem from './eventListItem'

const RequestedShows = ({ eventList, eventFilter }) => {

  return (
      <>
        <Col className="event-list">
          <h1>Requested Shows</h1>
        </Col>
      </>
  )
}

export default RequestedShows
