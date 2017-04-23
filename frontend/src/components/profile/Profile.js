import React, { Component } from 'react'
import ProfileForm from './ProfileForm'
import { connect } from 'react-redux'
import * as authActions from '../../store/actions/authActions'
import LoadingMask from '../mask/LoadingMask'

class Profile extends Component {

  static contextTypes = {
    router: React.PropTypes.object,
  }

  componentWillMount() {
    if (!this.props.auth.isAuthenticated) {
      this.context.router.push('/login');
    }
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.context.router.push('/');
    }
  }

  render() {
    return (
      <div className='Profile-container'>
        <ProfileForm auth={this.props.auth} user={this.props.auth.user} />
        {this.props.auth.pending ? <LoadingMask /> : null}
      </div>
    )
  }

}

const mapStateToProps = state => ({
  auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
  userInfoChangeRequest: payload => dispatch(authActions.userInfoChangeRequest(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
