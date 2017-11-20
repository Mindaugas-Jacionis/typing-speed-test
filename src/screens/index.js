import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as playersActions from '../reducers/players/actions';
import Main from './main';
import Register from './register';

class Routes extends Component {
  componentWillMount(){
    const { fetchPlayers } = this.props;
    fetchPlayers();
  }

  render() {
    const { loggedIn } = this.props;

    return (
      <Router>
        <Route exact path="/" component={loggedIn ? Main : Register}/>
      </Router>
    );
  }
}

function mapStateToProps(state, props) {
  const { loggedIn } = state.players;

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
