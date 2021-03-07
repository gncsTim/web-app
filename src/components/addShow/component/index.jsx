import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import { LodingComonent } from 'components/modal/loading'

import ShowForm from 'components/showForm'

class AddShow extends Component {
    render() {
        const { addShowRequest, pushRoute } = this.props

        return (
            <Container>
                <LodingComonent {...addShowRequest} handleSuccess={pushRoute}>
                    <h3>added new show</h3>
                </LodingComonent>
                <h1>Add Show</h1>
                {/* TODO:  show only if not editor */}
                <p>
                    That is the place where you can add your show. It will send to our database and
                    will checked by one of our editor
                </p>
                <ShowForm isAddShow />
            </Container>
        )
    }
}

AddShow.propTypes = {
    pushRoute: PropTypes.func.isRequired,
    addShowRequest: PropTypes.shape({
        loading: PropTypes.bool.isRequired
    })
}

export default AddShow
