import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { loginErrorToMessage } from '../../utils'

import { loginRequestAction } from '../../store/actions/authActions'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'username', 'password' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)


class LoginForm extends Component {

  componentWillMount() {
    if(this.props.auth.token)
      this.context.router.push('/')
  }

  componentWillUpdate(nextProps) {
    if(nextProps.auth.token)
      this.context.router.push('/')
  }

  login = (values) => {
     this.props.loginRequestClick({
       username: values.username,
       password: values.password
     })
   }
  render() {
    const { handleSubmit, pristine, submitting, touchOnChange, invalid, auth } = this.props

    return (
      <div className='LoginForm-container'>
        <form onSubmit={handleSubmit(this.login)}>
          {auth.error && !touchOnChange ? <div className='LoginForm-error'>{loginErrorToMessage(auth.error)}</div> : null}
          <div>
            <Field name="username" component={renderTextField} label="Username"/>
          </div>
          <div>
            <Field name="password" component={renderTextField} label="Password"/>
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
  loginRequestClick: PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: PropTypes.object
}

LoginForm = reduxForm({
  form: 'LoginForm',  // a unique identifier for this form
  validate
})(LoginForm)

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  loginRequestClick: params => dispatch(loginRequestAction(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
