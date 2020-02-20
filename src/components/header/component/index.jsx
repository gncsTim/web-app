import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import logoImage from 'assets/img/logo.svg'

const Header = ({ handleGetSession,handleLogout, userCtx }) => {
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
        <Navbar variant="dark" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/EventList">SHOWS</Link>
              <NavDropdown title="WIKI" id="basic-nav-dropdown">
                <LinkContainer to="/wikiBands">
                  <NavDropdown.Item>Bands</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/wikiVenues">
                  <NavDropdown.Item>Venues</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <Link to="/AddShow">+ SHOW</Link>
              <Link to="/AddWiki">+ WIKI</Link>
              <Link to="/Underground">UNDERGROUND</Link>
            </Nav>
            {userCtx && (
              <NavDropdown title={userCtx.name} id="userCtx-nav-dropdown">
                <Link to="/AddShow">+ SHOW</Link>
                <Button onClick={() => handleLogout()}>Logout</Button>
              </NavDropdown>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  )
}

Header.propTypes = {
  userCtx: PropTypes.oneOfType([
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      roles: PropTypes.arrayOf(PropTypes.string)
    }),
    null
  ]),
  handleGetSession: PropTypes.func,
  handleLogout: PropTypes.func
}

export default Header
