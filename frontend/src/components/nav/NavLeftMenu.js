import React from 'react'
import { connect } from 'react-redux'
import { toggleLeftMenu, toggleMask } from '../../store/actions/navActions'
import FingerPrint from 'material-ui/svg-icons/action/fingerprint'
import EventNote from 'material-ui/svg-icons/notification/event-note'
// import AccountBox from 'material-ui/svg-icons/action/account-box'
// import ContactMail from 'material-ui/svg-icons/communication/contact-mail'
import { logoutAction } from '../../store/actions/authActions'
import { browserHistory } from 'react-router'

import DirectionsWalk from 'material-ui/svg-icons/maps/directions-walk'

const NavLeftMenu = (props) => {
  const handleHideLeftMenu = () => {
    props.toggleMask()
    props.toggleLeftMenu()
  }
  let show = props.nav.leftMenu.show ? 'NavLeftMenu-menu-show' : ''
  return(
    <div className={`NavLeftMenu-menu ${show}`} onClick={handleHideLeftMenu}>
      <ul className='NavLeftMenu-ul'>
        { !props.auth.token
          ? [<li className='NavLeftMenu-li' key='NavLeftMenu-login' onClick={() => browserHistory.push('/login') }>
              <FingerPrint/>
              <div>Login</div>
            </li>,
            <li className='NavLeftMenu-li' key='NavLeftMenu-signup' onClick={() => browserHistory.push('/signup') }>
              <EventNote/>
              <div>Signup</div>
            </li>]
          : <li className='NavLeftMenu-li' key='NavLeftMenu-logout' onClick={() => props.logout()}>
              <DirectionsWalk/>
              <div>Logout</div>
            </li>
        }

      </ul>
    </div>
  )
}
const mapStateToProps = state => ({
  nav: state.nav,
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  toggleLeftMenu: () => dispatch(toggleLeftMenu()),
  toggleMask: () => dispatch(toggleMask()),
  logout: () => dispatch(logoutAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NavLeftMenu)
