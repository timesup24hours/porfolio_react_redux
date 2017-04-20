/* eslint-disable */
import 'rxjs'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { store, history } from './store/configStore'
import routes from './routes/routes'
import { profileMenuClose, scrollButtonShow, scrollButtonHide } from './store/actions/navActions'
import { navBarFontColorChangeToBlackUI } from './store/actions/UIActions'

// styles
// import 'bootstrap/dist/css/bootstrap.min.css';

require("!style-loader!css-loader!sass-loader!./styles/index.scss")

// material ui plugin
import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// returns compiled css code from file.scss, resolves Sass and CSS imports and url(...)s

// detect route changing
history.listen(event => {
  store.dispatch(profileMenuClose()) // close the profile menu when route change
  if(event.pathname === '/') { // toggle the scroll down button depence on the '/'
    store.dispatch(scrollButtonShow())
  } else {
    store.dispatch(navBarFontColorChangeToBlackUI())
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
