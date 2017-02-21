import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

const Logo = (props) => {
  const logoUp = props.nav.logo.up ? 'Logo-holder-up' : ''
  return(
    <div className='Logo-container'>
      <div className={`Logo-holder ${logoUp}`}>
        <div className='Logo-name'>
          {browserHistory.getCurrentLocation().pathname === '/'
            ? <div>HUANLIN HUANG</div>
            : <Link to='/'>HUANLIN HUANG</Link>
          }
        </div>
        <div className='Logo-portfolio'>
          {browserHistory.getCurrentLocation().pathname === '/'
            ? <div>HUANG'S PORTFOLIO</div>
            : <Link to='/'>HUANG'S PORTFOLIO</Link>
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  nav: state.nav
})


Logo.propTypes = {

}

export default connect(mapStateToProps, null)(Logo)
