import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
// import { asyncValidate } from './asyncValidate'
// import { validate } from './validate'
import axios from 'axios'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import classnames from 'classnames';

// export const asyncValidate = (values, dispatch) => {
//   if(values) {
//     return new Promise(( resovle, reject ) => {
//      return dispatch(isUserExistAction(values))
//       .then( res => {
//         if(res.data.success) {
//           resovle()
//         } else {
//           reject(res.data)
//         }
//       })
//     })
//   }
// }
//
// const validate = values => {
//   const errors = {}
//   const requiredFields = [ 'username', 'password', 'passwordConfirm' ]
//   requiredFields.forEach(field => {
//     if (!values[ field ]) {
//       errors[ field ] = 'Required'
//     }
//   })
//   if (values.username && values.username.length < 6) errors.username = `mush be longer than 6 characters! ${values.username.length}/6`
//   if (values.username && values.username.length > 20) errors.username = `mush be less than 20 characters! ${values.username.length}/20`
//   if (values.username && values.username.indexOf(' ') >= 0) errors.username = `Could not contain white space!`
//   if (values.passwordConfirm && values.password !== values.passwordConfirm) {
//     errors.password = 'Password mush be match'
//   }
//   // if (values.password && values.password.length < 6) errors.password = `mush be longer than 6 characters! ${values.password.length}/6`
//   // if (values.password && values.password.length > 20) errors.password = `mush be less than 20 characters! ${values.password.length}/20`
//   // if (values.password && values.password.indexOf(' ') >= 0) errors.password = `Could not contain white space!`
//   // if (values.passwordConfirm && values.passwordConfirm.length < 6) errors.passwordConfirm = `mush be longer than 6 characters! ${values.passwordConfirm.length}/6`
//   // if (values.passwordConfirm && values.passwordConfirm.length > 20) errors.passwordConfirm = `mush be less than 20 characters! ${values.passwordConfirm.length}/20`
//   // if (values.passwordConfirm && values.passwordConfirm.indexOf(' ') >= 0) errors.passwordConfirm = `Could not contain white space!`
//   // if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(values.email)) {
//   //   errors.email = 'Invalid email address'
//   // }
//   return errors
// }


class CategoryForm extends Component {
  state = {
  }


  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }


  submit = values => {

  }

  renderField = ({ input, name, label, type, meta: { asyncValidating, touched, error, valid, pristine } }) => {
    return <div className={classnames('CategoryForm-input', 'form-group',
              { 'async-validating': asyncValidating,
                'has-error': error,
                'has-success': touched && valid && !pristine,
              }
           )}>
              <label className="control-label" htmlFor={name}>{label}</label>
              <input
                {...input}
                type={type}
                name={name}
                placeholder={label}
                className={classnames('form-control')}
              />
              {touched && error && <span className='CategoryForm-input-error text-danger'>{error}</span>}
            </div>
  }

  renderSelector = ({ input, name, label, children, meta: { asyncValidating, touched, error, valid, pristine } }) => {
    return <div className={classnames('CategoryForm-input', 'form-group',
              { 'async-validating': asyncValidating,
                'has-error': error,
                // 'has-success': touched && valid && !pristine,
              }
           )}>
              <label className="control-label" htmlFor={name}>{label}</label>
              <select
                {...input}
                name={name}
                placeholder={label}
                className={classnames('form-control')}
              >
                <option value="" disabled>Choose your option</option>
                {children}
              </select>
              {touched && error && <span className='CategoryForm-input-error text-danger'>{error}</span>}

            </div>
  }


  render() {
    const { handleSubmit, pristine, submitting, submitSucceeded, invalid } = this.props

    const departments = this.props.menu.department.map((d, i) => {
      return <option key={i} value={d.name.name}>{d.name.name}</option>
    })

    return (
      <div className='CategoryForm container'>
        <div className="row">
          <div className="col-sm-12 col-xs-12">

            <form onSubmit={handleSubmit(this.submit)} className='CategoryForm-form' >

              <div className="col-sm-6 col-xs-12">
                <Field name="department-selector" children={departments} component={this.renderSelector} label="Department"/>
              </div>

              <div className="col-sm-6 col-xs-12">
                <Field name="department" type="text" component={this.renderField} label="Add Department"/>
              </div>

              <div className="col-sm-6 col-xs-12">
                <Field name="category-selector" children={departments} component={this.renderSelector} label="Category"/>
              </div>

              <div className="col-sm-6 col-xs-12">
                <Field name="category" type="text" component={this.renderField} label="Add Category"/>
              </div>

              <div className="col-sm-12 col-xs-12">
                <div className='CategoryForm-btn pull-right'>
                  <RaisedButton
                    label="SUBMIT"
                    type="submit"
                    disabled={pristine || submitting || invalid}
                  />
                </div>
              </div>

            </form>

          </div>
        </div>
      </div>
    )
  }
}

CategoryForm.contextTypes = {
  router: PropTypes.object,
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

CategoryForm.propTypes = {
}

CategoryForm = reduxForm({
  form: 'CategoryForm',  // a unique identifier for this form
  // validate,
  // asyncValidate,
  // asyncBlurFields: ['username'],
})(CategoryForm)

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm)
