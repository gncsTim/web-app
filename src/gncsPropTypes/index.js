import moment from 'moment'
import PropTypes from 'prop-types'

export const DatePropType = (props, propName, componentName) => {
  if (!moment(props[propName]).isValid()) {
    return new TypeError(
      `Invalid prop '${propName}' supplied to '${componentName}'. Validation failed. Passt prop '${
        props[propName]
      }' with type '${typeof props[propName]}'`
    )
  }
}

export const artistDetailsShape = {
  name: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.string)
}

export const eventShape = {
  name: PropTypes.string,
  venue: PropTypes.string,
  event_description: PropTypes.string,
  date: DatePropType,
  entrance_vvk: PropTypes.string,
  entrance_ak: PropTypes.string,
  artist_details: PropTypes.arrayOf(PropTypes.shape(artistDetailsShape))
}

export const userCtxShape = {
  name: PropTypes.string,
  roles: PropTypes.arrayOf(PropTypes.string)
}
