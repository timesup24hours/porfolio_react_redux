import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
// import { asyncValidate } from './asyncValidate'
// import { validate } from './validate'
import classnames from 'classnames';

class RenderInput extends Component {
  state = {
    [this.props.selectorName]: '',
    [`add-${this.props.inputName}`]: '',
    [`edit-${this.props.inputName}`]: '',
    addOpen: false,
    editOpen: false,
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  renderField = ({ input, name, label, type, meta: { asyncValidating, touched, error, valid, pristine } }) => {
    return <div className={classnames('RenderInput-input', 'form-group',
              { 'async-validating': asyncValidating,
                'has-error': error,
                // 'has-success': touched && valid && !pristine,
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
              {touched && error && <span className='RenderInput-input-error text-danger'>{error}</span>}
            </div>
  }

  renderSelector = ({ input, name, label, children, meta: { asyncValidating, touched, error, valid, pristine } }) => {
    return (<div className={classnames('RenderInput-input', 'form-group',
              { 'async-validating': asyncValidating,
                'has-error': error,
                // 'has-success': touched && valid && !pristine,
              }
           )}>
              <label className="control-label" htmlFor={name}>{label}</label>
              <select
                {...input}
                name={input.name}
                placeholder={label}
                className={classnames('form-control')}
              >
                <option value="" disabled>Choose your option</option>
                {children}
              </select>
              {touched && error && <span className='RenderInput-input-error text-danger'>{error}</span>}
            </div>)
  }

  renderInput = (selectorName, selectorChildren, selectorLabel, inputName, inputLabel) => {
    return (
      <div className='row flexCenter'>

        <div className="col-sm-6 col-xs-12">
          <Field name={selectorName} children={selectorChildren} component={this.renderSelector} label={selectorLabel}/>
        </div>

        {this.state.addOpen || this.state.editOpen
          ? null
          : (<div className="col-sm-6 col-xs-12">
              <div className="row">
                <div className="col-sm-4">
                  <RaisedButton label='add' onClick={e => this.setState({ addOpen: true })} />
                </div>
                <div className="col-sm-4">
                  <RaisedButton label='edit' onClick={e => this.setState({ editOpen: true })}  />
                </div>
                <div className="col-sm-4">
                  <RaisedButton label='delete' onClick={e => console.log('delete')} />
                </div>
              </div>
            </div>)
        }


        {this.state.addOpen
          ? <div className="col-sm-6 col-xs-12">
              <div className="row flexCenter">
                <div className="col-sm-6 col-xs-12">
                  <Field name={`add-${inputName}`} type="text" component={this.renderField} label={`Add ${inputLabel}`}/>
                </div>
                <div className="col-sm-3 col-xs-12">
                  <RaisedButton label='ADD' onClick={e => console.log('add')} />
                </div>
                <div className="col-sm-3 col-xs-12">
                  <RaisedButton label='CANCEL' onClick={e => this.setState({ addOpen: false })} />
                </div>
              </div>
            </div>
          : null
        }

        {this.state.editOpen
          ? <div className="col-sm-6 col-xs-12">
              <div className="row flexCenter">
                <div className="col-sm-6 col-xs-12">
                  <Field name={`edit-${inputName}`} type="text" component={this.renderField} label={`Edit ${inputLabel}`}/>
                </div>
                <div className="col-sm-3 col-xs-12">
                  <RaisedButton label='EDIT' onClick={e => console.log('edit')} />
                </div>
                <div className="col-sm-3 col-xs-12">
                  <RaisedButton label='CANCEL' onClick={e => this.setState({ editOpen: false })} />
                </div>
              </div>
            </div>
          : null
        }


      </div>
    )
  }


  render() {

    return (
      <div>
        {this.renderInput(this.props.selectorName,
                          this.props.selectorChildren,
                          this.props.selectorLabel,
                          this.props.inputName,
                          this.props.inputLabel,
                        )}
      </div>
    )
  }
}

RenderInput.contextTypes = {
  router: PropTypes.object,
}
const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
})

RenderInput.propTypes = {
}

RenderInput = reduxForm({
  form: 'RenderInput',  // a unique identifier for this form
  // validate,
  // asyncValidate,
  // asyncBlurFields: ['username'],
})(RenderInput)

export default connect(mapStateToProps, mapDispatchToProps)(RenderInput)
