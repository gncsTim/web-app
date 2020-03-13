import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { userCtxShape } from 'gncsPropTypes'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import logoImage from 'assets/img/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


const Header = ({ handleGetSession, handleLogout, userCtx }) => {
  useEffect(() => {
    if (!userCtx) handleGetSession()
  })
  return (
    <header>
      <div className="header-logo">
        <Link to="/">
          <img src={logoImage} alt="gncs logo" />
        </Link>
      </div>
      <div className="main-container">
        <Navbar variant="dark" expand="sm">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/EventList">SHOWS</Link>
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

              <Link to="/AddShow"><FontAwesomeIcon icon={faPlus} /> ADD SHOW</Link>
              {/*
              <Link to="/AddWiki">+ WIKI</Link>
              */}

              <Link to="/Underground">UNDERGROUND</Link>
            </Nav>
            <Nav>
              {userCtx && (
                <NavDropdown className="user-menu" title={userCtx.name} id="userCtx-nav-dropdown">
                  <LinkContainer to="/Eventlist" onClick={() => handleLogout()}>
                    <NavDropdown.Item> Logout</NavDropdown.Item>
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
  handleLogout: PropTypes.func
}

export default Header
