import React from 'react'
import PropTypes from 'prop-types'

import { userCtxShape }from 'gncsPropTypes'

class RequestActor extends React.Component {
  componentDidUpdate(prevProps) {
    console.log('component did update prev props', prevProps)
    const { owneRequestIds, setRequestSync, userCtx } = this.props
    if (owneRequestIds.length > 0 && (owneRequestIds !== prevProps.owneRequestIds || userCtx !== prevProps.userCtx)) {
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
  setRequestSync: PropTypes.func.isRequired,
  userCtx: PropTypes.shape(userCtxShape)
}

export default RequestActor