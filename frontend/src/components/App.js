import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Nav from './nav/Nav'
// import Block from './block/Block'<Block />
import NavLeftMenu from './nav/NavLeftMenu'
import Mask from './mask/Mask'
import Logo from './nav/Logo'
import LoadingBar from 'react-redux-loading-bar'
import * as cartActions from '../store/actions/cartActions'
import * as menuActions from '../store/actions/menuActions'
import Snackbar from 'material-ui/Snackbar'
import { snackbarClose } from '../store/actions/snackbarActions'
import { connect } from 'react-redux'
import NotificationAlert from './notification/NotificationAlert'
import NotificationSlide from './notification/NotificationSlide'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import * as UIActions from '../store/actions/UIActions'
import { store } from '../store/configStore'

class App extends Component {

  static propTypes = {
    getCartRequest: PropTypes.func,
    snackbarClose: PropTypes.func,
    // UI: PropTypes.obj
  }

  // detect Safari browser in js
  // componentWillUpdate(nextProps) {
    // if (navigator.userAgent.indexOf('Safari') !== -1 &&
    // navigator.userAgent.indexOf('Chrome') === -1) {
    // }
  // }

  componentDidMount() {
    this.props.getCategoryRequest()
    if(localStorage.getItem('user.data')) {
      this.props.getCartRequest()
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleCloseDialog}
      />,
      <FlatButton
        label={this.props.UI.dialog.trueBtnText || 'Comfirm'}
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => store.dispatch(this.props.UI.dialog.action)}
      />,
    ]

    return (
      <div className='App-container'>
        <LoadingBar
          updateTime={100}
          maxProgress={95}
          progressIncrease={10}
          className='loading'
        />
        <Nav />

        <Logo />
        <Mask />
        <NavLeftMenu />
        {this.props.UI.notificationSlide.open
          ? <NotificationSlide
              content={this.props.UI.notificationSlide.content}
              open={this.props.UI.notificationSlide.open}
              cancel={this.props.UInotificationSlideCancel}
            />
          : null
        }
        <div className='App-children'>
          {this.props.UI.mask.show ? <div className='App-mask' /> : null}
          {this.props.children}
          <Snackbar
            open={this.props.snackbar.open}
            message={this.props.snackbar.message}
            autoHideDuration={5000}
            onRequestClose={() => this.props.snackbarClose()}
          />
        </div>

        <NotificationAlert
          show={this.props.UI.notificationAlert.show}
          content={this.props.UI.notificationAlert.content}
        />

        <Dialog
          title={this.props.UI.dialog.title}
          actions={actions}
          modal={false}
          open={this.props.UI.dialog.open}
          onRequestClose={this.props.handleCloseDialog}
        >
          {this.props.UI.dialog.content}
        </Dialog>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  UI: state.UI,
  snackbar: state.snackbar,
})
const mapDispatchToProps = dispatch => ({
  getCartRequest: () => dispatch(cartActions.getCartRequest()),
  getCategoryRequest: () => dispatch(menuActions.getCategoryRequest()),
  snackbarClose: () => dispatch(snackbarClose()),
  UInotificationSlideCancel: () => dispatch(UIActions.UInotificationSlideCancel()),
  handleCloseDialog: () => dispatch(UIActions.handleCloseDialog()),
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
