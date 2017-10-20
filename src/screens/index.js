import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './main';
import SignIn from './signIn';

class Routes extends Component {
  render() {
    const { loggedIn } = this.props;

    return (
      <Router>
        <Route exact path="/" component={loggedIn ? Main : SignIn}/>
      </Router>
    );
  }
}

function mapStateToProps(state, props) {
  const { loggedIn } = state.signIn;

  return {
    loggedIn
  };
}

export default connect(mapStateToProps)(Routes);
