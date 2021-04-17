import React from 'react'
import PropTypes from 'prop-types'
import { Collapse, Button } from 'react-bootstrap'

class PrivacyComponent extends React.Component {
    constructor(props) {
        super(props)
        this.handleClickSaveEssentialData = this.handleClickSaveEssentialData.bind(
            this
        )
    }
    componentDidMount() {
        this.props.loadPrivacy()
    }
    handleClickSaveEssentialData() {
        this.props.saveEssentialData()
    }
    render() {
        const { showPrivacy } = this.props
        return (
            <div className="privacy">
                <Collapse in={showPrivacy}>
                    <div className="privacy-content">
                        Anim pariatur cliche reprehenderit, enim eiusmod high
                        life accusamus terry richardson ad squid. Nihil anim
                        keffiyeh helvetica, craft beer labore wes anderson cred
                        nesciunt sapiente ea proident.
                        <Button onClick={this.handleClickSaveEssentialData}>
                            essential
                        </Button>
                    </div>
                </Collapse>
            </div>
        )
    }
}

PrivacyComponent.propTypes = {
    saveEssentialData: PropTypes.func.isRequired,
    loadPrivacy: PropTypes.func.isRequired,
    showPrivacy: PropTypes.bool,
}

PrivacyComponent.defaultProps = {
    showPrivacy: false
}

export default PrivacyComponent
