import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import * as authActions from '../../store/actions/authActions'
import { validate, initialValidate } from './validate'
import { stateData } from '../../utils/data'
import map from 'lodash/map';
import classnames from 'classnames';

class ProfileForm extends Component {
  state = {
    username: this.props.user.local ? this.props.user.local.username : '',
    nickname: this.props.user.local ? this.props.user.local.nickname : '',
    email: this.props.user.email || '',
    street: this.props.user.address ? this.props.user.address.street : '',
    city: this.props.user.address ? this.props.user.address.city : '',
    state: this.props.user.address ? this.props.user.address.state : '',
    zipcode: this.props.user.address ? this.props.user.address.zipcode : '',
    cellphone: this.props.user.contact ? this.props.user.contact.cellphone : '',
    homephone: this.props.user.contact ? this.props.user.contact.homephone : '',
    workphone: this.props.user.contact ? this.props.user.contact.workphone : '',
    errors: '',
    isLoading: false,
    valid: '',
  }

  componentDidMount() {
    this.setState({
      errors: validate(this.state).errors,
      valid: validate(this.state).valid
    })
    initialValidate()
  }

  isValid = () => {
    const { errors, isValid } = validate(this.state)

    if (!isValid) {
      this.setState({ errors })
    }

    return isValid
  }

  handleSubmit = e => {
    e.preventDefault()
    if(this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userInfoChangeRequest(this.state)
    } else {

    }
    this.setState({ isLoading: false });
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleOnBlur = e => {
    this.setState({
      errors: validate(this.state).errors,
      valid: validate(this.state).valid
    })
  }

  render() {
    const options = map(stateData, (val, key) => {
      return <option key={key} value={key}>{key}</option>
    })
    return (
      <div className='ProfileForm container'>


            {/* row */}
            <div className='row'>
              <div className="col-sm-6 col-xs-12">
                <div className='form-group'>
                  <label className="" htmlFor="ProfileForm-username">Username (not editable)</label>
                  <input
                    className="form-control"
                    defaultValue={this.state.username || ''}
                    readOnly
                    disabled
                    id='ProfileForm-username'
                    name="username"
                    type="text"
                  />
                </div>
              </div>
            </div>

            {/* row */}
            <div className='row'>

              <div className="col-sm-6 col-xs-12">
                <div className='form-group'>
                  <label className="" htmlFor="ProfileForm-nickname">Nick Name</label>
                  <input
                    className="form-control"
                    onBlur={this.handleOnBlur}
                    placeholder="Nick Name"
                    onChange={this.handleOnChange}
                    value={this.state.nickname  || ''}
                    maxLength={12}
                    id='ProfileForm-nickname'
                    name="nickname"
                    type="text"
                  />
                </div>
              </div>


              <div className="col-sm-6 col-xs-12">
                  <div className={classnames('form-group', {'has-error' : this.state.errors.email, 'has-success': this.state.valid.email})}>
                  <label
                    className="control-label"
                    htmlFor="ProfileForm-email">Email</label>
                  <input
                    onBlur={this.handleOnBlur}
                    placeholder="Email"
                    onChange={this.handleOnChange}
                    value={this.state.email  || ''}
                    id='ProfileForm-email'
                    name="email"
                    type="text"
                    className='form-control'
                  />
                  <span className='text-danger ProfileForm-invalid-span'>{this.state.errors.email}</span>
                </div>
              </div>

            </div>

            {/* row */}
            <div className='row'>

              <div className="col-sm-6 col-xs-12">
                <div className='form-group'>
                  <label className="" htmlFor="ProfileForm-street">Street</label>
                  <input
                    className="form-control"
                    onBlur={this.handleOnBlur}
                    value={this.state.street  || ''}
                    onChange={this.handleOnChange}
                    placeholder="Street"
                    id='ProfileForm-street'
                    name="street"
                    type="text"
                  />
                </div>
              </div>

              <div className="col-sm-6 col-xs-12">
                <div className='form-group'>
                  <label className="" htmlFor="ProfileForm-city">City</label>
                  <input
                    className="form-control"
                    onBlur={this.handleOnBlur}
                    placeholder="City"
                    onChange={this.handleOnChange}
                    value={this.state.city  || ''}
                    id='ProfileForm-city  '
                    name="city"
                    type="text"
                  />
                </div>
              </div>

            </div>

            {/* row */}
            <div className='row'>

              <div className="col-sm-6 col-xs-12">
                <div className='form-group'>
                  <label>State</label>
                  <select
                    className="form-control"
                    id='ProfileForm-state'
                    name='state'
                    value={this.state.state  || ''}
                    onChange={this.handleOnChange}
                  >
                    <option disabled>Choose your state</option>
                    {options}
                  </select>
                </div>
              </div>

              <div className="col-sm-6 col-xs-12">
                <div className='form-group'>
                  <label className="" htmlFor="ProfileForm-zipcode">Zip Code</label>
                  <input
                    className="form-control ProfileForm-zipcode"
                    onBlur={this.handleOnBlur}
                    placeholder="Zip Code"
                    onChange={this.handleOnChange}
                    value={this.state.zipcode  || ''}
                    pattern="^\d{5}$"
                    id='ProfileForm-zipcode'
                    name="zipcode"
                    type='number'
                    onKeyPress={e => {
                      if(e.charCode === 101 || e.charCode === 45 || e.charCode === 46) {
                        e.preventDefault()
                      }
                    }}
                    min='0'
                    step='any'
                  />
                </div>
              </div>

            </div>

            {/* row */}
            <div className='row'>

              <div className="col-sm-4 col-xs-12">
                <div className={classnames('form-group', {'has-error' : this.state.errors.cellphone, 'has-success': this.state.valid.cellphone})}>
                  <label className="control-label"
                    htmlFor="ProfileForm-cellphone">Cell Phone</label>
                  <input
                    onBlur={this.handleOnBlur}
                    value={this.state.cellphone  || ''}
                    onChange={this.handleOnChange}
                    placeholder="Cell Phone"
                    id='ProfileForm-cellphone'
                    pattern="^\d{3}-\d{3}-\d{4}$"
                    name="cellphone"
                    type="tel"
                    className='ProfileForm-cellphone form-control'
                  />
                  <span className='help-inline text-danger ProfileForm-invalid-span'>{this.state.errors.cellphone}</span>
                </div>
              </div>

              <div className="col-sm-4 col-xs-12">
                <div className={classnames('form-group', {'has-error' : this.state.errors.homephone, 'has-success': this.state.valid.homephone})}>
                  <label className="control-label"
                    htmlFor="ProfileForm-homephone">Home Phone</label>
                  <input
                    onBlur={this.handleOnBlur}
                    placeholder="Home Phone"
                    onChange={this.handleOnChange}
                    value={this.state.homephone  || ''}
                    id='ProfileForm-homephone'
                    name="homephone"
                    type="tel"
                    className='ProfileForm-homephone form-control'
                  />
                  <span className='text-danger ProfileForm-invalid-span'>{this.state.errors.homephone}</span>
                </div>
              </div>

              <div className="col-sm-4 col-xs-12">
                <div className={classnames('form-group', {'has-error' : this.state.errors.workphone, 'has-success': this.state.valid.workphone})}>
                  <label className="control-label"
                    htmlFor="ProfileForm-workphone">Work Phone</label>
                  <input
                    onBlur={this.handleOnBlur}
                    placeholder="Work Phone"
                    maxLength="12"
                    onChange={this.handleOnChange}
                    value={this.state.workphone || ''}
                    id='ProfileForm-workphone'
                    name="workphone"
                    type="tel"
                    className='ProfileForm-workphone form-control'
                  />
                </div>
              </div>

            </div>

            {/* row */}
            <div className='row'>

              <div className='col-sm-12'>
                <div className='ProfileForm-submitButton pull-right'>
                  <button
                    disabled={this.state.isLoading || !validate(this.state).isValid}
                    className='btn btn-primary'
                    onClick={e => this.handleSubmit(e)}
                  >
                    UPDATE
                  </button>
                </div>
              </div>

            </div>



      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  userInfoChangeRequest: payload => dispatch(authActions.userInfoChangeRequest(payload)),
})

const mapStateToProps = state => ({
})

ProfileForm.propTypes = {
  user: PropTypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)
