import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFacebookSquare,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <footer>
            <div className="main-container">
                <div className="footer-content">
                    GOOD NIGHT COUCH SIDE <br />
                    The page for underground shows and subculture in Berlin and
                    everywhere else
                </div>
                <div className="footer-links">
                    <a
                        href="https://www.facebook.com/goodnightcouchside"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon icon={faFacebookSquare} />
                    </a>
                    <a
                        href="https://www.instagram.com/goodnightcouchside/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <Link to="/privacy">Privacy</Link>
                    <Link to="/Imprint">Imprint</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer
