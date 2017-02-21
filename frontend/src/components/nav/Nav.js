import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import NavRightMenu from './NavRightMenu'
import LoadingBar from 'react-redux-loading-bar'
import RightSmallMenu from './RightSmallMenu'
import { logoUp, logoDown, navBarShadow, navBarShadowHide, profileMenuOpen, profileMenuClose,
   scrollButtonShow, scrollButtonHide } from '../../store/actions/navActions'
import { logoutAction } from '../../store/actions/authActions'
import ScrollDownButton from './ScrollDownButton'
//
const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';//

class Nav extends Component {

  closeProfileMenu = () => {
    if(this.props.nav.profileMenu.open) {
      this.props.profileMenuClose()
    }
  }

  toggleScrollButton = () => { // depending on scrollTop position
    // console.log(document.body.scrollTop + document.documentElement.clientHeight,  '>=', document.body.scrollHeight - document.documentElement.clientHeight);
    if(document.body.scrollTop + document.documentElement.clientHeight > document.body.scrollHeight - document.documentElement.clientHeight / 2) {
      if(this.props.nav.scrollButton.show) {
        this.props.scrollButtonHide()
      }
    } else {
      if(this.props.nav.scrollButton.show === false) {
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

    this.toggleScrollButton()
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scroll);
    window.addEventListener("resize", this.closeProfileMenu)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scroll)
    window.removeEventListener('scroll', this.closeProfileMenu)
  }

  handleLogout = () => {
    this.props.logout()
    this.props.profileMenuOpen()
  }

  render() {
    const navBarShadowShow = this.props.nav.navBar.shadow ? 'Nav-container-shadow' : ''
    const toggleProfileMenu = this.props.nav.profileMenu.open ? '' : 'hide'

    return (
      <div className={`Nav-container ${navBarShadowShow}`}>
        <LoadingBar
          updateTime={100}
          maxProgress={95}
          progressIncrease={10}
          className='loading' />

        <div className='Nav-rightMenu-container'>
          <NavRightMenu />
          <RightSmallMenu />
        </div>

        <div className={`Nav-popMenu ${toggleProfileMenu}`}>
          <Paper style={style}>
            <Menu>
              <MenuItem primaryText="Log out" onClick={this.handleLogout} />
            </Menu>
          </Paper>
        </div>

        <ScrollDownButton />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  nav: state.nav
})

const mapDispatchToProps = dispatch => ({
  logoUp: () => dispatch(logoUp()),
  navBarShadow: () => dispatch(navBarShadow()),
  logoDown: () => dispatch(logoDown()),
  navBarShadowHide: () => dispatch(navBarShadowHide()),
  logout: () => dispatch(logoutAction()),
  profileMenuOpen: () => dispatch(profileMenuOpen()),
  profileMenuClose: () => dispatch(profileMenuClose()),
  scrollButtonShow: () => dispatch(scrollButtonShow()),
  scrollButtonHide: () => dispatch(scrollButtonHide()),
})

Nav.propTypes = {

}

Nav.contextTypes = {
  router: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
