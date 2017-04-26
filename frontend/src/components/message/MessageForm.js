import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, reset } from 'redux-form'
import { messageSubmitting, messageSubmitSuccess, messageSubmitFail, messageSendRequest } from '../../store/actions/messageActions'
import RaisedButton from 'material-ui/RaisedButton'
// import { asyncValidate } from './asyncValidate'
// import { validate } from './validate'
import { renderTextField } from '../../utils'
// import Notification from '../notification/Notification'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

class MessageForm extends Component {
  state = {
    buttonGroupShow: false
  }

  submitClick = (values, dispatch) => {
    this.props.messageSubmitting()
    this.props.dispatch(showLoading())
    return new Promise((resovle, reject) => {
      return this.props.dispatch(messageSendRequest(values))
        .then((res) => {
          dispatch(reset('MessageForm'))
          this.hideButtons()
          this.props.messageSubmitSuccess(res.data)
          resovle()
          this.props.dispatch(hideLoading())
        })
        .catch(e => {
          reject({ content: e.response.data })
          this.hideButtons()
          this.props.messageSubmitFail(e)
          this.props.dispatch(hideLoading())
        })
    })
  }

  showButtons = () => {
    this.setState({ buttonGroupShow: true })
  }
  hideButtons = () => {
    this.setState({ buttonGroupShow: false })
  }

  render() {
    const showButtonGroup = this.state.buttonGroupShow ? '' : 'hide'
    const { handleSubmit, pristine, submitting, invalid } = this.props
    return (
      <div className='MessageForm-container'>
        <form onSubmit={handleSubmit(this.submitClick)} className='MessageForm-form' >
          <div>
            <Field
              name="content"
              component={renderTextField}
              label="Message"
              onFocus={() => this.showButtons()}
            />
          </div>
          <div className={`MessageForm-buttonGroup ${showButtonGroup}`}>
            <div className='MessageForm-cancel'>
              <RaisedButton
                label="CANCEL"
                onClick={() => this.hideButtons()}
                disabled={submitting}
              />
            </div>
            <div className='MessageForm-submitButton'>
              <RaisedButton
                label="SUBMIT"
                type="submit"
                disabled={pristine || submitting || invalid}
              />
            </div>
          </div>
        </form>

      </div>
    )
  }
}
// <Notification cancellable={false} show={submitSucceeded} content='You have signup successfully' email={this.props.auth.user ? this.props.auth.user.username : null} />
MessageForm.contextTypes = {
  router: PropTypes.object
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  messageSubmitting: () => dispatch(messageSubmitting()),
  messageSubmitSuccess: params => dispatch(messageSubmitSuccess(params)),
  messageSubmitFail: e => dispatch(messageSubmitFail(e)),
})

// SignupForm.propTypes = {
//   signupRequestClick: PropTypes.func.isRequired
// }

MessageForm = reduxForm({
  form: 'MessageForm',  // a unique identifier for this form
  // validate,
  // asyncValidate,
  // asyncBlurFields: [ 'username' ]
})(MessageForm)

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm)
