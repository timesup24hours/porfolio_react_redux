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
    isLoading: false
  }

  componentDidMount() {
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
    this.setState({ errors: validate(this.state).errors })
  }

  render() {
    const options = map(stateData, (val, key) => {
      return <option key={key} value={key}>{key}</option>
    })
    return (
      <div className="row">
        <div className="col s12">

          {/* row */}
          <div className='row'>
            <div className="input-field col s6">
              <input
                defaultValue={this.state.username || ''}
                readOnly
                disabled
                id='ProfileForm-username'
                name="username"
                type="text"
                className="validate"/>
              <label className="active" htmlFor="ProfileForm-username">Username (not editable)</label>
            </div>
          </div>
          {/* row */}
          <div className="row">
            <div className="input-field col s6">
              <input
                onBlur={this.handleOnBlur}
                placeholder="Nick Name"
                onChange={this.handleOnChange}
                value={this.state.nickname  || ''}
                maxLength={12}
                id='ProfileForm-nickname'
                name="nickname"
                type="text"
                className="validate"/>
              <label className="active" htmlFor="ProfileForm-nickname">Nick Name</label>
            </div>

            <div className="input-field col s6">
              <input
                onBlur={this.handleOnBlur}
                placeholder="Email"
                onChange={this.handleOnChange}
                value={this.state.email  || ''}
                id='ProfileForm-email'
                name="email"
                type="text"
                className={classnames({ 'invalid': this.state.errors.email })}/>
              <label className="active"
                data-error={this.state.errors.email}
                htmlFor="ProfileForm-email">Email</label>
            </div>
          </div>

          {/* row */}
          <div className='row'>
            <div className="input-field col s6">
              <input
                onBlur={this.handleOnBlur}
                value={this.state.street  || ''}
                onChange={this.handleOnChange}
                placeholder="Street"
                id='ProfileForm-street'
                name="street"
                type="text"
                className="validate"/>
              <label className="active" htmlFor="ProfileForm-street">Street</label>
            </div>

            <div className="input-field col s6">
              <input
                onBlur={this.handleOnBlur}
                placeholder="City"
                onChange={this.handleOnChange}
                value={this.state.city  || ''}
                id='ProfileForm-city  '
                name="city"
                type="text"
                className="validate"/>
              <label className="active" htmlFor="ProfileForm-city">City</label>
            </div>
          </div>
          {/* row */}
          <div className='row'>
            <div className="col s6">
              <label>State</label>
              <select
                className="browser-default"
                id='ProfileForm-state'
                name='state'
                value={this.state.state  || ''}
                onChange={this.handleOnChange}>\
                  <option disabled>Choose your state</option>
                  {options}
              </select>
            </div>

            <div className="input-field col s6">
              <input
                onBlur={this.handleOnBlur}
                placeholder="Zip Code"
                onChange={this.handleOnChange}
                value={this.state.zipcode  || ''}
                pattern="^\d{5}$"
                id='ProfileForm-zipcode'
                name="zipcode"
                type="text"
                className="validate ProfileForm-zipcode"/>
              <label className="active" htmlFor="ProfileForm-zipcode">Zip Code</label>
            </div>
          </div>
          {/* row */}
          <div className='row'>
            <div className="input-field col s4">
              <input
                onBlur={this.handleOnBlur}
                value={this.state.cellphone  || ''}
                onChange={this.handleOnChange}
                placeholder="Cell Phone"
                id='ProfileForm-cellphone'
                pattern="^\d{3}-\d{3}-\d{4}$"
                name="cellphone"
                type="tel"
                className={classnames('ProfileForm-cellphone', { 'invalid': this.state.errors.cellphone })}/>
              <label className="active"
                data-error={this.state.errors.cellphone}
                htmlFor="ProfileForm-cellphone">Cell Phone</label>
            </div>

            <div className="input-field col s4">
              <input
                onBlur={this.handleOnBlur}
                placeholder="Home Phone"
                onChange={this.handleOnChange}
                value={this.state.homephone  || ''}
                id='ProfileForm-homephone'
                name="homephone"
                type="tel"
                className={classnames('ProfileForm-homephone', { 'invalid': this.state.errors.homephone })}/>
              <label className="active"
                data-error={this.state.errors.homephone}
                htmlFor="ProfileForm-homephone">Home Phone</label>
            </div>

            <div className="input-field col s4">
              <input
                onBlur={this.handleOnBlur}
                placeholder="Work Phone"
                maxLength="12"
                onChange={this.handleOnChange}
                value={this.state.workphone || ''}
                id='ProfileForm-workphone'
                name="workphone"
                type="tel"
                className={classnames('ProfileForm-workphone', { 'invalid': this.state.errors.workphone })}/>
              <label className="active"
                data-error={this.state.errors.workphone}
                htmlFor="ProfileForm-workphone">Work Phone</label>
            </div>
          </div>
          {/* row */}
          <div className='row'>
            <div className='col s12'>
              <div className='ProfileForm-submitButton right'>
                <button
                  disabled={this.state.isLoading || !validate(this.state).isValid}
                  className='waves-effect waves-light btn'
                  onClick={e => this.handleSubmit(e)} >UPDATE</button>
              </div>
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
