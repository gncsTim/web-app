import React from 'react'
import PropTypes from 'prop-types'

class RequestActor extends React.Component {
  componentDidUpdate(prevProps) {
    console.log('component did update prev props', prevProps)
    const { owneRequestIds, setRequestSync } = this.props
    if (owneRequestIds !== prevProps.owneRequestIds && owneRequestIds.length > 0) {
      console.log('update own request prps: ', owneRequestIds)
      setRequestSync(owneRequestIds)
    }
  }
  render() {
    return <div></div>
  }
}

RequestActor.propTypes = {
  owneRequestIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  setRequestSync: PropTypes.func.isRequired
}

export default RequestActor