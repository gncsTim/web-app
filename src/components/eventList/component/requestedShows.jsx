import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Col } from 'react-bootstrap'
import EventFilter from 'components/eventFilter/container'
import EventListItem from './eventListItem'

const RequestedShows = ({ loadRequestedShows, requestedShows }) => {
    useEffect(() => {
        loadRequestedShows()
    }, [])
    return (
        <Col className="event-list">
            <h1>Requestet Shows</h1>
            <EventFilter />
            {requestedShows.rows
                ? requestedShows.rows
                    .map((item) => item.doc)
                    .map((event) => (
                        <EventListItem key={event._id} event={event} />
                    ))
                : 'not request shows'}
        </Col>
    )
}

RequestedShows.propTypes = {
    loadRequestedShows: PropTypes.func.isRequired,
    // TODO: add requestet shoe propTypes
    requestedShows: PropTypes.any,
}

export default RequestedShows
