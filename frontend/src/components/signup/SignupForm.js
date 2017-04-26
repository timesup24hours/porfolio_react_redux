import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { signupRequestAction, signupSuccess, signupFail } from '../../store/actions/authActions'
import RaisedButton from 'material-ui/RaisedButton'
import { asyncValidate } from './asyncValidate'
import { validate } from './validate'
import NotificationModal from '../notification/NotificationModal'
import axios from 'axios'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import classnames from 'classnames';
const selector = formValueSelector('SignupForm')


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
      return axios.post(`${process.env.API_HOST}/api/signup`, values)
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
    return <div className={classnames('SignupForm-input', 'form-group', { 'async-validating': asyncValidating })}>
              <label className="control-label" htmlFor={name}>{label}</label>
              <input
                {...input}
                type={type}
                name={name}
                placeholder={label}
                className={classnames('form-control', { 'invalid': touched && error })}
              />
              {touched && error && <span className='SignupForm-input-error text-danger'>{error}</span>}
            </div>
  }


  render() {
    const { handleSubmit, pristine, submitting, submitSucceeded, invalid } = this.props

    return (
      <div className='SignupForm-container'>
        {!submitSucceeded
          ? <form onSubmit={handleSubmit(this.signup)} className='SignupForm-form' >
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
          : null
        }
        <NotificationModal
          show={submitSucceeded}
          title='SIGN UP'
          content={`Welcome ${this.props.username} You have signup successfully`}
        />
      </div>
    )
  }
}

SignupForm.contextTypes = {
  router: PropTypes.object,
}

const mapStateToProps = state => ({
  auth: state.auth,
  username: selector(state, 'username'), // 'formValueSelector' select the values of the form
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
