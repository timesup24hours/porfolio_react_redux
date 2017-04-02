import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { signupRequestAction, signupSuccess, signupFail } from '../../store/actions/authActions'
import RaisedButton from 'material-ui/RaisedButton'
import { asyncValidate } from './asyncValidate'
import { validate } from './validate'
import Notification from '../notification/Notification'
import axios from 'axios'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import classnames from 'classnames';

class SignupForm extends Component {
  state = {
    username: '',
  }


  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }


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

  renderField = ({ input, name, label, type, meta: { asyncValidating, touched, error } }) => {
    return <div className={classnames('SignupForm-input', 'input-field', { 'async-validating': asyncValidating })}>
              <input
                {...input}
                type={type}
                name={name}
                placeholder={label}
                className={classnames('validate', { 'invalid': touched && error })}
              />
              <label className="active"
                htmlFor={name}>{label}</label>
              {touched && error && <span className='SignupForm-input-error red-text'>{error}</span>}
            </div>
  }


  render() {
    const { handleSubmit, pristine, submitting, submitSucceeded, invalid } = this.props

    return (
      <div className='SignupForm-container'>
        <form onSubmit={handleSubmit(this.signup)} className='SignupForm-form' >
          <div className='row'>
            <Field name="username" type="text" component={this.renderField} label="Username"/>
          </div>
          <div className='row'>
            <Field name="password" component={this.renderField} label="Password"/>
          </div>
          <div className='row'>
            <Field name="passwordConfirm" component={this.renderField} label="Password Confirmation"/>
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
  router: PropTypes.object,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
  signupRequestClick: () => dispatch(signupRequestAction()),
  signupSuccess: () => dispatch(signupSuccess()),
  signupFail: () => dispatch(signupFail()),
})

SignupForm.propTypes = {
  signupRequestClick: PropTypes.func.isRequired,
}

SignupForm = reduxForm({
  form: 'SignupForm',  // a unique identifier for this form
  validate,
  asyncValidate,
  asyncBlurFields: ['username'],
})(SignupForm)

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)
