import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import NavRightMenu from './NavRightMenu'
import RightSmallMenu from './RightSmallMenu'
import * as navActions from '../../store/actions/navActions'
import { logoutAction } from '../../store/actions/authActions'
import ScrollDownButton from './ScrollDownButton'
import { browserHistory } from 'react-router'
import ProfileMenu from './ProfileMenu'
import * as UIActions from '../../store/actions/UIActions'
import * as cartActions from '../../store/actions/cartActions'

class Nav extends Component {

  closeProfileMenu = () => {
    if(this.props.nav.profileMenu.open) {
      this.props.profileMenuClose()
    }
  }

  toggleScrollButton = () => { // depending on scrollTop position
    let el = document.querySelector('.ScrollDownButton-container')
    if(document.body.scrollTop + document.documentElement.clientHeight > document.body.scrollHeight - document.documentElement.clientHeight) { // document.documentElement.clientHeight /2 would disappear later
      if(this.props.nav.scrollButton.show) {
        if(el.style.pointerEvents === '') el.style.pointerEvents = 'none'
        el.className = 'ScrollDownButton-container animated bounceOut'
        this.scrollButtonHideTimer = setTimeout(() => {
          this.props.scrollButtonHide()
        }, 800)
      }
    } else {
      if(this.props.nav.scrollButton.show === false) {
        clearTimeout(this.scrollButtonHideTimer)
        this.props.scrollButtonShow()
      }
    }
  }

  scroll = () => {
    if(document.body.scrollTop > 200) {
      this.props.logoUp()
      this.props.navBarShadow()
    } else {
      this.props.logoDown()
      this.props.navBarShadowHide()
    }

    this.closeProfileMenu()

    if(browserHistory.getCurrentLocation().pathname === '/') {
      this.toggleScrollButton()
      document.body.scrollTop >= document.querySelectorAll('#home')[1].offsetTop
        ? this.props.navBarFontColorChangeToWhiteUI()
        : this.props.navBarFontColorChangeToBlackUI()
    }
  }

  closeProfileMenuListener = e => {
    if (this.props.nav.profileMenu.open // if open && click outside of the element than close the profileMenu
      && !document.querySelector('#profileMenu').contains(e.target)) {
      this.props.profileMenuClose()
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scroll);
    window.addEventListener("resize", this.closeProfileMenu)
    if(browserHistory.getCurrentLocation().pathname === '/') this.props.scrollButtonShow()
    window.addEventListener('click', this.closeProfileMenuListener)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scroll)
    window.removeEventListener('scroll', this.closeProfileMenu)
    window.removeEventListener('click', this.closeProfileMenuListener)
  }

  handleLogout = () => {
    this.props.logout()
    this.props.profileMenuOpen()
    this.props.clearCart()
  }

  render() {
    const navBarShadowShow = this.props.nav.navBar.shadow ? 'Nav-container-shadow' : ''
    const navBarShadow = browserHistory.getCurrentLocation().pathname !== '/' ? 'Nav-container-shadow' : ''
    const navBarBackgroundColor = browserHistory.getCurrentLocation().pathname !== '/' ? 'Nav-background-color' : ''
    
    return (
      <div className={`Nav-container ${navBarShadowShow} ${navBarShadow} ${navBarBackgroundColor}`}>
        <div className='Nav-rightMenu-container'>
          <NavRightMenu />
          <RightSmallMenu />
        </div>

        { this.props.nav.profileMenu.open
          ? <ProfileMenu handleLogout={this.handleLogout} id={this.props.auth.user._id} cart={this.props.cart} />
          : null
        }

        {this.props.nav.scrollButton.show && !this.props.nav.leftMenu.show ? <ScrollDownButton />  : null}

      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  nav: state.nav,
  cart: state.cart,
})

const mapDispatchToProps = dispatch => ({
  logoUp: () => dispatch(navActions.logoUp()),
  navBarShadow: () => dispatch(navActions.navBarShadow()),
  logoDown: () => dispatch(navActions.logoDown()),
  navBarShadowHide: () => dispatch(navActions.navBarShadowHide()),
  logout: () => dispatch(logoutAction()),
  profileMenuOpen: () => dispatch(navActions.profileMenuOpen()),
  profileMenuClose: () => dispatch(navActions.profileMenuClose()),
  scrollButtonShow: () => dispatch(navActions.scrollButtonShow()),
  scrollButtonHide: () => dispatch(navActions.scrollButtonHide()),
  navBarFontColorChangeToWhiteUI: () => dispatch(UIActions.navBarFontColorChangeToWhiteUI()),
  navBarFontColorChangeToBlackUI: () => dispatch(UIActions.navBarFontColorChangeToBlackUI()),
  clearCart: () => dispatch(cartActions.clearCart()),
})

Nav.propTypes = {

}

Nav.contextTypes = {
  router: PropTypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
