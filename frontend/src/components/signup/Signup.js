import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SignupForm from './SignupForm'


class Signup extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentWillMount() {
    if(this.props.auth.isAuthenticated) {
      this.context.router.push('/');
    }
  }

  render() {
    return (
      <div className='Signup'>
        <SignupForm />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})
const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
