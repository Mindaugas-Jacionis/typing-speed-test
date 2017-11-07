import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as playersActions from '../reducers/players/actions';
import Main from './main';
import SignIn from './signIn';

class Routes extends Component {
  componentWillMount(){
    const { fetchPlayers } = this.props;
    fetchPlayers();

    // playersRef.on('child_added', snapshot => {
      // console.log('hillow', snapshot.val());
      /* Update React state when message is added at Firebase Database */
      // let message = { text: snapshot.val(), id: snapshot.key };
      // this.setState({ messages: [message].concat(this.state.messages) });
    // });
  }

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

function mapDispatchToProps(dispatch) {
  return {
    fetchPlayers: bindActionCreators(playersActions.fetchAll, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
