import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { setUserCtx } from './action'

class UserActor extends React.Component {
    componentDidMount() {
        const gncsUser = JSON.parse(localStorage.getItem('gncsUser'))
        if (gncsUser) {
            this.props.handleSetUserCtx(gncsUser)
        }
    }
    render() {
        return null
    }
}

UserActor.propTypes = {
    handleSetUserCtx: PropTypes.func.isRequired,
}

const mapDispatch = (dispatch) => ({
    handleSetUserCtx: (gncsUser) => dispatch(setUserCtx(gncsUser)),
})

export default connect(null, mapDispatch)(UserActor)
