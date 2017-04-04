import React, { Component } from 'react'
import { connect } from 'react-redux'
import SignupForm from './SignupForm'


class Signup extends Component {

  static propTypes = {
    auth: React.PropTypes.object.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
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
