import React from 'react'
import PropTypes from 'prop-types'

import { userCtxShape } from 'gncsPropTypes'

class RequestActor extends React.Component {
    componentDidUpdate(prevProps) {
        console.log('component did update prev props', prevProps)
        const { ownRequestIds, setRequestSync, userCtx } = this.props
        if (
            ownRequestIds.length > 0 &&
            (ownRequestIds !== prevProps.ownRequestIds ||
                userCtx !== prevProps.userCtx)
        ) {
            console.log('update own request prps: ', ownRequestIds)
            setRequestSync(ownRequestIds)
        }
    }
    render() {
        return <div></div>
    }
}

RequestActor.propTypes = {
    ownRequestIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    setRequestSync: PropTypes.func.isRequired,
    userCtx: PropTypes.shape(userCtxShape),
}

export default RequestActor
