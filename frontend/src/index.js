/* eslint-disable */
import 'rxjs'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { store, history } from './store/configStore'
import routes from './routes/routes'
import { profileMenuClose, scrollButtonShow, scrollButtonHide } from './store/actions/navActions'

require("!style-loader!css-loader!sass-loader!./styles/index.scss")

// material ui plugin
import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// returns compiled css code from file.scss, resolves Sass and CSS imports and url(...)s

// detect route changing
history.listen( event => {
  // console.log('changing route, route name:', event.pathname)
  store.dispatch(profileMenuClose())
  // console.log(store.getState().nav.profileMenu);
  if(event.pathname === '/') {
    // && document.body.scrollTop + document.documentElement.clientHeight < document.body.scrollHeight - document.documentElement.clientHeight / 2) {
    store.dispatch(scrollButtonShow())
  } else {
    store.dispatch(scrollButtonHide())
  }
})

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)
