import React from 'react'
import { Collapse } from 'react-bootstrap'

class PrivacyComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ show: true })
        }, 2000)
    }
    render() {
        const { show } = this.state
        return (
            <div className="privacy">
                <Collapse in={show}>
                    <div className="privacy-content">
                        Anim pariatur cliche reprehenderit, enim eiusmod high
                        life accusamus terry richardson ad squid. Nihil anim
                        keffiyeh helvetica, craft beer labore wes anderson cred
                        nesciunt sapiente ea proident.
                    </div>
                </Collapse>
            </div>
        )
    }
}

export default PrivacyComponent
