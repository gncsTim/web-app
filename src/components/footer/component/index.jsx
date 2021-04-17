import React from 'react'
import { Link } from 'react-router-dom'
import Privacy from 'components/modal/privacy'

const Footer = () => {
    return (
        <footer>
            <div className="main-container">
                <div className="footer-content">
                    GOOD NIGHT COUCH SIDE <br />
                    The page for underground shows and subculture in Berlin and everywhere else
                </div>
                <div className="footer-links">
                    <Link to="/Imprint">Imprint</Link>
                </div>
                <Privacy />
            </div>
            
        </footer>
    )
}

export default Footer
