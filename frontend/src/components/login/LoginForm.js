import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import classnames from 'classnames';

import { loginErrorToMessage } from '../../utils'

import { loginRequestAction } from '../../store/actions/authActions'

const validate = values => {
  const errors = {}
  const requiredFields = ['username', 'password']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

const renderField = ({ input, name, label, type, meta: { asyncValidating, touched, error } }) => {
  return <div className={classnames('LoginForm-input', 'form-group', { 'async-validating': asyncValidating })}>
          <label className="control-label" htmlFor={name}>{label}</label>
            <input
              {...input}
              type={type}
              name={name}
              placeholder={label}
              className={classnames('form-control', { 'invalid': touched && error })}
            />
            {touched && error && <span className='LoginForm-input-error text-danger'>{error}</span>}
          </div>
}

class LoginForm extends Component {

  componentWillMount() {
    if(this.props.auth.token)
      this.context.router.push('/')
  }

  componentWillUpdate(nextProps) {
    if(nextProps.auth.token)
      this.context.router.goBack()
    if(nextProps.auth.token && this.context.router.getCurrentLocation().pathname === '/login')
      this.context.router.push('/')
  }

  login = (values) => {
    this.props.loginRequestClick({
      username: values.username,
      password: values.password,
    })
  }

  render() {
    const { handleSubmit, pristine, submitting, touchOnChange, invalid, auth } = this.props

    return (
      <div className='LoginForm-container'>
        <form onSubmit={handleSubmit(this.login)}>
          {auth.error && !touchOnChange ? <div className='LoginForm-error'>{loginErrorToMessage(auth.error)}</div> : null}
          <div className='row'>
            <Field name="username" type="text" component={renderField} label="Username"/>
          </div>
          <div className='row'>
            <Field name="password" type="text" component={renderField} label="Password"/>
          </div>
          <div className='LoginForm-loginButton'>
            <RaisedButton label="Login"  type="submit" disabled={pristine || submitting || invalid} />
          </div>
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {
  loginRequestClick: PropTypes.func.isRequired,
}

LoginForm.contextTypes = {
  router: PropTypes.object,
}

LoginForm = reduxForm({
  form: 'LoginForm',  // a unique identifier for this form
  validate,
})(LoginForm)

const mapStateToProps = state => ({
  auth: state.auth,
})

const mapDispatchToProps = (dispatch) => ({
  loginRequestClick: params => dispatch(loginRequestAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
