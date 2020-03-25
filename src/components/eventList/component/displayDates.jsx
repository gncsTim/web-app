import React from 'react'
import PropTypes from 'prop-types'
import {isMomentProptype} from 'gncsPropTypes'
import moment from 'moment'

const DisplayDates = ({eventDate, today}) => {
  let tomorrow = today.add(1, 'd')
  let weekday = moment(eventDate, 'DD.MM.YYYY').day()

  return(
    <>
      {weekday === 5 ? `Friday - ${eventDate}`
        : weekday === 6 ? `Saturday - ${eventDate}`
        : moment(eventDate).isSame(today, 'day') ?  `Today - ${eventDate}`
        : moment(eventDate).isSame(tomorrow, 'day') ?  `Tomorrow - ${eventDate}`
        : eventDate }
    </>
  )
}
DisplayDates.propTypes = {
  eventDate: PropTypes.string,
  today: isMomentProptype
}

export default DisplayDates
