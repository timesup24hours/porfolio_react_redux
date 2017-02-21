import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
// import { loadingBarMiddleware } from 'react-redux-loading-bar'
import thunk from 'redux-thunk'


import rootReducer from './reducers/rootReducer'
import rootEpic from './epics/rootEpic'

// instantiate epic middleware
const epicMiddleware = createEpicMiddleware(rootEpic)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const preparedRouterMiddleware = routerMiddleware(browserHistory)

const middlewares = composeEnhancers(
  applyMiddleware(
    epicMiddleware,
    preparedRouterMiddleware,
    thunk,
    // loadingBarMiddleware({
    //     promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
    //   })
    )
)
// create store
const store = createStore(rootReducer, middlewares)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

export { store, history }
