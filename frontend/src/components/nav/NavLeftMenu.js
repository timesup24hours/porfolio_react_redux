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
import Message from 'material-ui/svg-icons/communication/message'
import Thumbup from 'material-ui/svg-icons/action/thumb-up'

const NavLeftMenu = (props) => {
  const handleHideLeftMenu = () => {
    props.toggleMask()
    props.toggleLeftMenu()
  }
  let show = props.nav.leftMenu.show ? 'NavLeftMenu-menu-show' : ''
  return(
    <div className={`NavLeftMenu-menu ${show}`} onClick={handleHideLeftMenu}>
      <ul className='NavLeftMenu-ul'>
        <li className='NavLeftMenu-li' onClick={() => browserHistory.push('/comment')}>
          <Message style={{ marginTop: '4px' }}/>
          <div>Comment</div>
        </li>
        <li className='NavLeftMenu-li' onClick={() => browserHistory.push('/shop')}>
          <i className="material-icons">shopping_basket</i>
          <div>Shop</div>
        </li>
        <li className='NavLeftMenu-li' onClick={() => browserHistory.push('/learning')}>
          <Thumbup style={{ marginTop: '4px' }}/>
          <div>Learning</div>
        </li>
        { !props.auth.isAuthenticated
          ? [
              <li className='NavLeftMenu-li' key='NavLeftMenu-login' onClick={() => browserHistory.push('/login') }>
                <FingerPrint/>
                <div>Login</div>
              </li>,
              <li className='NavLeftMenu-li' key='NavLeftMenu-signup' onClick={() => browserHistory.push('/signup') }>
                <EventNote/>
                <div>Signup</div>
              </li>,
            ]
          : [
              <li className='NavLeftMenu-li' key='NavLeftMenu-cart' onClick={() => browserHistory.push('/cart')}>
                <i className="material-icons">shopping_cart</i>
                <div>Cart</div>
              </li>,
              <li className='NavLeftMenu-li' key='NavLeftMenu-upload' onClick={() => browserHistory.push('/upload_product')}>
                <i className="material-icons">backup</i>
                <div>Upload Product</div>
              </li>,
              <li className='NavLeftMenu-li' key='NavLeftMenu-profile' onClick={() => browserHistory.push('/profile')}>
                <i className="material-icons">person</i>
                <div>Profile</div>
              </li>,
              <li className='NavLeftMenu-li' key='NavLeftMenu-logout' onClick={() => props.logout()}>
                <DirectionsWalk/>
                <div>Logout</div>
              </li>,
            ]
        }

      </ul>
    </div>
  )
}
const mapStateToProps = state => ({
  nav: state.nav,
  auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
  toggleLeftMenu: () => dispatch(toggleLeftMenu()),
  toggleMask: () => dispatch(toggleMask()),
  logout: () => dispatch(logoutAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NavLeftMenu)
