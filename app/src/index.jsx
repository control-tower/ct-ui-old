import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import Routes from './routes';
import * as reducers from './reducers';


const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
});


const middlewareRouter = routerMiddleware(browserHistory);

const store = createStore(
  reducer,
  applyMiddleware(middlewareRouter),
  applyMiddleware(thunk)
);

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Routes history={history} />
  </Provider>,
  document.getElementById('app')
);
