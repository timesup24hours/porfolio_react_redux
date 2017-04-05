import React, { Component } from 'react';
import { connect } from 'react-redux';
import { snackbarOpen } from '../store/actions/snackbarActions'
// import { browserHistory } from 'react-router'

export const requireAuth = (ComposedComponent) => {
  class Authenticate extends Component {

    static propTypes = {
      isAuthenticated: React.PropTypes.bool.isRequired,
      snackbarOpen: React.PropTypes.func.isRequired,
    }

    static contextTypes = {
      router: React.PropTypes.object.isRequired,
    }

    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.snackbarOpen('You need to login to access this page')
        this.context.router.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }


  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
    }
  }

  return connect(mapStateToProps, { snackbarOpen })(Authenticate);
}
