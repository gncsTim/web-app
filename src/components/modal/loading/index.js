import React from 'react'
import PropTypes from 'prop-types'

import logoImage from 'assets/img/logo.svg'

export const LodingComonent = ({ children, loading, success, error, handleSuccess }) => {
  console.log(loading)
  if (!loading && !(success || error)) return null
  console.log(success)
  if (success && typeof handleSuccess === 'function') handleSuccess()
  return (
    <div className="loading-content-box">
      <div className="content">
        {loading && <img src={logoImage} alt="gncs logo" />}
        {success && <div>okay</div>}
        {error && <div>error</div>}
        {children}
      </div>
    </div>
  )
}

LodingComonent.propTypes = {
  loading: PropTypes.bool.isRequired,
  success: PropTypes.object,
  error: PropTypes.object,
  children: PropTypes.node,
  handleSuccess: PropTypes.func
}
