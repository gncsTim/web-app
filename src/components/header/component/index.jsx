import React from 'react'
import PropTypes from 'prop-types'

import { userCtxShape } from 'gncsPropTypes'
import {Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import logoImage from 'assets/img/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { Tween, Timeline } from 'react-gsap'
import {TweenMax, Linear} from 'gsap'
import CalculateMobileNav from './calculateMobileNav'


const Header = ({ handleGetSession, handleLogout, userCtx, hideNav }) => {
  hideNav = true
  let basicNavbar
  let basicNavbarHigh

  window.onload = () => {
     basicNavbarHigh = CalculateMobileNav()
     basicNavbar = document.getElementById("basic-navbar-nav")

  }
  console.log(basicNavbarHigh)

  const toggleNavBar = () => {
    let menuIcon = document.getElementsByClassName("test")
    let test = new Tween();

    if (hideNav) {
      console.log(basicNavbarHigh)

      // basicNavbar.classList.add("show")
      // TweenMax.to(basicNavbar, 0.5,{display:"block"})
      TweenMax.to(basicNavbar, 0.5,{y:basicNavbarHigh})
      TweenMax.to(menuIcon, 0.5, {rotation:135});
      hideNav = false
    } else {
      // basicNavbar.classList.remove("show")
      // TweenMax.to(basicNavbar, 0.5,{display:"none"})
      TweenMax.to(basicNavbar, 0.5,{y:"-" + basicNavbarHigh})

      TweenMax.to(menuIcon, 0.5, {rotation:0});
      hideNav = true;
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
        <Navbar variant="dark" expand="sm" >
          <span className="d-block d-sm-none burger-menu" onClick={() => toggleNavBar()}>
            <FontAwesomeIcon className="test" icon={faPlus} /> Menu
          </span>
          <div id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/EventList" onClick={() => toggleNavBar()}>SHOWS</Link>
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

              <Link to="/AddShow" onClick={() => toggleNavBar()}><FontAwesomeIcon icon={faPlus} /> ADD SHOW</Link>
              {/*
              <Link to="/AddWiki">+ WIKI</Link>
              */}

              <Link to="/Underground" onClick={() => toggleNavBar()}>UNDERGROUND</Link>
              {/* Moblie Account Menu*/}
              {userCtx && (
              <div className="user-menu-mobile">
                <Link to="/Eventlist" onClick={() => {handleLogout(); toggleNavBar()} } > LOGOUT <FontAwesomeIcon icon={faSignOutAlt} /></Link>
              </div>
            )}
            </Nav>
            <Nav className="user-menu">
              {userCtx && (
                <NavDropdown title={userCtx.name} id="userCtx-nav-dropdown">
                  <LinkContainer to="/Eventlist" onClick={() => handleLogout()}>
                    <NavDropdown.Item> Logout</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </div>
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
