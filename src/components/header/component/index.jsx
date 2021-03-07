import React from 'react'
import PropTypes from 'prop-types'

import { userCtxShape } from 'gncsPropTypes'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import logoImage from 'assets/img/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons'

const Header = ({ handleGetSession, handleLogout, userCtx, hideNav }) => {
    hideNav = true
    const toggleNavBar = () => {
        let basicNavbar = document.getElementById('basic-navbar-nav')
        if (hideNav) {
            basicNavbar.classList.add('show')
            hideNav = false
        } else {
            basicNavbar.classList.remove('show')
            hideNav = true
        }
    }

    return (
        <header>
            <div className="header-logo">
                <Link to="/">
                    <img src={logoImage} alt="gncs logo" />
                </Link>
            </div>
            <div className="main-container">
                <Navbar variant="dark" expand="sm">
                    <span className="d-block d-sm-none burger-menu" onClick={() => toggleNavBar()}>
                        <FontAwesomeIcon icon={faBars} />
                    </span>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/EventList" onClick={() => toggleNavBar()}>
                                SHOWS
                            </Link>
                            {/*

              <NavDropdown title="WIKI" id="basic-nav-dropdown">
                <LinkContainer to="/wikiBands">
                  <NavDropdown.Item>Bands</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/wikiVenues">
                  <NavDropdown.Item>Venues</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              */}

                            <Link to="/AddShow" onClick={() => toggleNavBar()}>
                                <FontAwesomeIcon icon={faPlus} /> ADD SHOW
                            </Link>
                            {/*
              <Link to="/AddWiki">+ WIKI</Link>
              */}

                            <Link to="/Underground" onClick={() => toggleNavBar()}>
                                UNDERGROUND
                            </Link>
                            <a
                                href="https://www.facebook.com/goodnightcouchside"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => toggleNavBar()}
                            >
                                <FontAwesomeIcon icon={faFacebookSquare} />
                            </a>
                            <a
                                href="https://www.instagram.com/goodnightcouchside/"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => toggleNavBar()}
                            >
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            {/* Moblie Account Menu*/}
                            {userCtx && (
                                <div className="user-menu-mobile">
                                    <p>Admin:</p>
                                    <Link to="/RequestedShows" onClick={() => toggleNavBar()}>Requested Shows</Link>
                                    <Link to="/AddShow" onClick={() => toggleNavBar()}>Add Shows</Link>
                                    <Link
                                        to="/Eventlist"
                                        onClick={() => {
                                            handleLogout()
                                            toggleNavBar()
                                        }}
                                    >
                                        {' '}
                                        LOGOUT <FontAwesomeIcon icon={faSignOutAlt} />
                                    </Link>
                                </div>
                            )}
                        </Nav>
                        <Nav>
                            {userCtx && (
                                <NavDropdown
                                    className="user-menu"
                                    title={userCtx.name}
                                    id="userCtx-nav-dropdown"
                                >
                                    <LinkContainer to="/RequestedShows">
                                      <NavDropdown.Item>Requested Shows</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/AddShow">
                                      <NavDropdown.Item>Add Shows</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/Eventlist" onClick={() => handleLogout()}>
                                      <NavDropdown.Item>Logout <FontAwesomeIcon icon={faSignOutAlt} /></NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </header>
    )
}

Header.propTypes = {
    userCtx: PropTypes.shape(userCtxShape),
    handleGetSession: PropTypes.func,
    handleLogout: PropTypes.func,
    hideNav: PropTypes.bool,
}

export default Header
