import React from 'react'
import PropTypes from 'prop-types'
import { Link as ReactLink } from 'react-router'

const Link = ({to, name, fn, styles}) => (
  <div style={style.container, styles}>
    <ReactLink to={to} onClick={fn} >{name}</ReactLink>
  </div>
)

Link.propTypes = {
  to: PropTypes.string,
  name: PropTypes.string,
  fn: PropTypes.func
}

export default Link

const style = {
  container: {
    border: '1px solid red',
    height: '20px',
    width: '30px'
  }
}
