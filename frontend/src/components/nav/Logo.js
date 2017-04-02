import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

const Logo = (props) => {
  const logoUp = props.nav.logo.up ? 'Logo-holder-up' : ''
  const colorChange = props.UI.navBarFontColor.change && !props.nav.leftMenu.show ? { color: 'white' } : {}
  return(
    <div className='Logo-container'>
      <div className={`Logo-holder ${logoUp}`}>
        <div className='Logo-name'>
          {browserHistory.getCurrentLocation().pathname === '/'
            ? <div style={colorChange}>HUANLIN HUANG</div>
            : <Link style={colorChange} className='coursor-pointer' to='/'>HUANLIN HUANG</Link>
          }
        </div>
        <div className='Logo-portfolio'>
          {browserHistory.getCurrentLocation().pathname === '/'
            ? <div style={colorChange}>HUANG'S PORTFOLIO</div>
            : <Link style={colorChange} className='coursor-pointer' to='/'>HUANG'S PORTFOLIO</Link>
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  nav: state.nav,
  UI: state.UI,
})


Logo.propTypes = {

}

export default connect(mapStateToProps, null)(Logo)
