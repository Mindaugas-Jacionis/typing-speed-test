import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ApiMiddleware, Fire } from './utils';
import reducer from './reducers';
import Routes from './screens';
import './style/index.scss';

const middlewares = [thunk, ApiMiddleware('')];
// const toolChain = [applyMiddleware(...middlewares)];
const store = compose(applyMiddleware(...middlewares))(createStore)(reducer, {});

class App extends Component {
  // componentWillMount(){
  //   /* Create reference to messages in Firebase Database */
  //   let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
  //   messagesRef.on('child_added', snapshot => {
  //     /* Update React state when message is added at Firebase Database */
  //     let message = { text: snapshot.val(), id: snapshot.key };
  //     this.setState({ messages: [message].concat(this.state.messages) });
  //   })
  // }

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
