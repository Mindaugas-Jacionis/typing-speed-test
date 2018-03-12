import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ApiMiddleware, Fire } from './utils';
import reducer from './reducers';
import Routes from './screens';
import './style/index.scss';

const middlewares = [thunk, ApiMiddleware('')];
const store = compose(applyMiddleware(...middlewares))(createStore)(reducer, {});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
