import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { signupRequestAction, signupSuccess, signupFail } from '../../store/actions/authActions'
import RaisedButton from 'material-ui/RaisedButton'
import { asyncValidate } from './asyncValidate'
import { validate } from './validate'
import { renderTextField } from '../../utils'
import Notification from '../notification/Notification'
import axios from 'axios'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

class SignupForm extends Component {

  signup = values => {
    this.props.signupRequestClick()
    this.props.dispatch(showLoading())
    return new Promise((resovle, reject) => {
      return axios.post('/api/signup', values)
        .then((res) => {
          this.props.signupSuccess(res.data)
          resovle()
          setTimeout(() => {
            this.props.dispatch(hideLoading())
          }, 1000)
        })
        .catch((e) => {
          this.props.signupFail()
          setTimeout(() => {
            this.props.dispatch(hideLoading())
          }, 1000)
        })
    })
  }

  render() {
    const { handleSubmit, pristine, submitting, submitSucceeded, invalid } = this.props
    return (
      <div className='SignupForm-container'>
        <form onSubmit={handleSubmit(this.signup)} className='SignupForm-form' >
          <div>
            <Field name="username" component={renderTextField} label="Username"/>
          </div>
          <div>
            <Field name="password" component={renderTextField} label="Password"/>
          </div>
          <div>
            <Field name="passwordConfirm" component={renderTextField} label="Password Confirm"/>
          </div>
          <div className='SignupForm-loginButton'>
            <RaisedButton
              label="Signup"
              type="submit"
              disabled={pristine || submitting || invalid || this.props.auth.status === 'pending'}
            />
          </div>
        </form>
        <Notification cancellable={false} show={submitSucceeded} content='You have signup successfully' email={this.props.auth.user ? this.props.auth.user.username : null} />
      </div>
    )
  }
}

SignupForm.contextTypes = {
  router: PropTypes.object
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  signupRequestClick: () => dispatch(signupRequestAction()),
  signupSuccess: () => dispatch(signupSuccess()),
  signupFail: () => dispatch(signupFail())
})

SignupForm.propTypes = {
  signupRequestClick: PropTypes.func.isRequired
}

SignupForm = reduxForm({
  form: 'SignupForm',  // a unique identifier for this form
  validate,
  asyncValidate,
  asyncBlurFields: [ 'username' ]
})(SignupForm)

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)
