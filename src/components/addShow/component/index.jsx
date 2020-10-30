import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import { Typeahead } from 'react-bootstrap-typeahead'
import { Form, Button } from 'react-bootstrap'
import Datetime from 'react-datetime'
import uuidv1 from 'uuid/v1'
import { Col, Row } from 'react-bootstrap'
import crypto from 'crypto'
import ksuid from 'ksuid'
import { LodingComonent } from 'components/modal/loading'
import { WithContext as ReactTags } from 'react-tag-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'
import { isAdminOrEditor } from 'components/user/utils'

import ShowForm from 'components/showForm'

class AddShow extends Component {
    render() {
        const { addShowRequest, pushRoute } = this.props

        return (
            <Container>
                <LodingComonent {...addShowRequest} handleSuccess={pushRoute}>
                    <h3>added new show</h3>
                </LodingComonent>
                <h1>Good Night Couch Side | Add Show</h1>
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
