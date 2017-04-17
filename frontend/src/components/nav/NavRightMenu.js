import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory } from 'react-router'
import { profileMenuOpen } from '../../store/actions/navActions'
import { Link } from 'react-router'
import UserAvatar from './UserAvatar'
// import Menu from '../menu/Menu'
import * as UIActions from '../../store/actions/UIActions'

const NavRightMenu = (props) => {
  const handleProfileMenuToggle = () => {
    props.profileMenuOpen()
  }

  const colorChange = props.UI.navBarFontColor.change ? { color: 'white' } : {}

  return(
    <div className='NavRightMenu-container'>
      <ul className='NavRightMenu-ul'>
        {/*
          props.menu.categories
          ? <li className='NavRightMenu-department' onMouseLeave={props.hideMaskUI} onMouseEnter={props.showMaskUI} >
              DEPARTMENTS
              <Menu menu={props.menu} />
            </li>
          : null
        */}
        <li className='NavRightMenu-li'>
          <Link to='/shop' style={colorChange} activeClassName="NavRightMenu-link-active">SHOP ALL</Link>
        </li>
        <li className='NavRightMenu-li'>
          <Link to='/comment' style={colorChange} activeClassName="NavRightMenu-link-active">COMMENT</Link>
        </li>
        <li className='NavRightMenu-li'>
          <Link to='/learning' style={colorChange} activeClassName="NavRightMenu-link-active">LEARNING</Link>
        </li>
        { props.auth.token
          ? <li className='NavRightMenu-li'
                onClick={handleProfileMenuToggle}
                id='profileMenu'
                key='avatar'>
              <UserAvatar user={props.auth.user} onClick={() => {}}/>
            </li>
          : [<li className='NavRightMenu-li' key='login'>
              <RaisedButton
                label="LOGIN"
                primary={true}
                onClick={() => browserHistory.push('/login') } />
            </li>,
            <li className='NavRightMenu-li' key='signup'>
              <RaisedButton
                label="SIGNUP"
                primary={true}
                onClick={() => browserHistory.push('/signup') } />
            </li>]
        }
      </ul>
    </div>
  )
}

NavRightMenu.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  UI: state.UI,
  menu: state.menu,
})

const mapDispatchToProps = dispatch => ({
  profileMenuOpen: () => dispatch(profileMenuOpen()),
  hideMaskUI: () => dispatch(UIActions.hideMaskUI()),
  showMaskUI: () => dispatch(UIActions.showMaskUI()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NavRightMenu)
