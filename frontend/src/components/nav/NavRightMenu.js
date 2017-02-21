import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory } from 'react-router'
import Avatar from 'material-ui/Avatar'
import { profileMenuOpen } from '../../store/actions/navActions'

const NavRightMenu = (props) => (
  <div className='NavRightMenu-container'>
    <ul className=''>
      {props.auth.token
        ? <li onClick={() => props.profileMenuOpen()} key='avatar'>
            <Avatar style={{ cursor: 'pointer' }} >{props.auth.user.local.username.split('')[0].toUpperCase()}</Avatar>
          </li>
        : [<li className='' key='login'>
            <RaisedButton
              label="LOGIN"
              primary={true}
              onClick={() => browserHistory.push('/login') } />
          </li>,
          <li className='' key='signup'>
            <RaisedButton
              label="SIGNUP"
              primary={true}
              onClick={() => browserHistory.push('/signup') } />
          </li>]
      }

    </ul>
  </div>
)

NavRightMenu.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  profileMenuOpen: () => dispatch(profileMenuOpen())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavRightMenu)
