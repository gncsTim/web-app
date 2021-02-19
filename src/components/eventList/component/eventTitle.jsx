import React from 'react'
import PropTypes from 'prop-types'

const EventTitle = ({ title, headliner }) => {
    const hasEventTitle = title && title.trim() !== ''
    return (
        <>
            <h2>{hasEventTitle ? title : headliner}</h2>
            {hasEventTitle ? <h3>{headliner}</h3> : null}
        </>
    )
}

EventTitle.propTypes = {
    title: PropTypes.string,
    headliner: PropTypes.string.isRequired,
}

export default EventTitle
