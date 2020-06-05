import React from 'react'
// import PropTypes from 'prop-types'

const CalculateMobileNav = () => {

    let basicNavbarHigh

    let basicNavbar = document.getElementById("basic-navbar-nav")
    basicNavbarHigh = basicNavbar.offsetHeight
    basicNavbarHigh = basicNavbarHigh + "px"
    basicNavbar.style.top = "-" + basicNavbarHigh
    console.log(basicNavbarHigh)
    console.log("asfd");


    return (basicNavbarHigh)
}

export default CalculateMobileNav
