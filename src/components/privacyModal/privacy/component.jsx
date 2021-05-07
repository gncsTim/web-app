import React from 'react'
import PropTypes from 'prop-types'
import { Collapse, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class PrivacyComponent extends React.Component {
    constructor(props) {
        super(props)
        this.handleClickSaveEssentialData = this.handleClickSaveEssentialData.bind(
            this
        )
        this.handleClickRemoveNotification = this.handleClickRemoveNotification.bind(
            this
        )
    }
    componentDidMount() {
        this.props.loadPrivacy()
    }
    handleClickSaveEssentialData() {
        this.props.saveEssentialData()
    }
    handleClickRemoveNotification() {
        this.props.removeNotification()
    }
    render() {
        const { showPrivacy } = this.props
        return (
            <div className="main-container">
                <div className="privacy">
                    <Collapse in={showPrivacy}>
                        <div className="privacy-content">
                            <p>
                                Wir speichern keine Benutzer definierten Daten, außer die Zustimmung darüber dass wir keine weiteren Benutzerdaten speichern. 
                                Wenn nicht zugestimmt wird, werden keine Daten gespeichert und diese Abfrage erscheint bei jeden reload.
                            </p>
                            <Button variant='primary' onClick={this.handleClickSaveEssentialData}>
                                speichern
                            </Button>
                            <Button variant='secondary' onClick={this.handleClickRemoveNotification}>
                                nicht speichern
                            </Button>
                            <p>
                                Weitere Information zum <Link to="/privacy">Datenschutz</Link>
                            </p>
                        </div>
                    </Collapse>
                </div>
            </div>
        )
    }
}

PrivacyComponent.propTypes = {
    saveEssentialData: PropTypes.func.isRequired,
    loadPrivacy: PropTypes.func.isRequired,
    showPrivacy: PropTypes.bool,
    removeNotification: PropTypes.func.isRequired
}

PrivacyComponent.defaultProps = {
    showPrivacy: false
}

export default PrivacyComponent
