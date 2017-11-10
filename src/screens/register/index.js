import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Button } from '../../components/ui';
import Immutable from 'seamless-immutable';
import * as playersActions from '../../reducers/players/actions';
import { emailRegex } from '../../Constants';
import { Fire } from '../../utils';
import './index.scss';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      emailValid: true,
      nameValid: true
    }
  }

  validate() {
    const { email, name } = this.state;
    let isValid = true;

    if (!name || name.length < 2) {
      isValid = false;
      this.setState({ nameValid: false });
    }

    if (!emailRegex.test(email)) {
      isValid = false;
      this.setState({ emailValid: false });
    }

    return isValid;
  }

  onChange(key, event) {
    const { value } = event.target;
    const validityKey = `${key}Valid`;

    this.setState({
      [key]: value,
      [validityKey]: true
    });
  }

  onClick() {
    const { email, name } = this.state;
    const { newPlayer } = this.props;
    const isValid = this.validate();

    if (isValid) {
      newPlayer({ name, email, score: 0 });
    }
  }

  renderTopTen() {
    const { topTen } = this.props;

    return (
      topTen.map(player => (
        <div className={'SignIn__highscore--player'}>
          <span>{player.name}</span>
          <span>{player.score}</span>
        </div>
      ))
    );
  }

  renderEmpty() {
    const { isFetching } = this.props;

    if (isFetching) {
      return (
        <div className={'SignIn__highscore--empty'}>
          <h3>{'Loading...'}</h3>
        </div>
      );
    }

    return (
      <div className={'SignIn__highscore--empty'}>
        <h3>{'List is Empty! Be the First One!'}</h3>
      </div>
    );
  }

  render() {
    const { emailValid, nameValid } = this.state;
    const { topTen } = this.props;

    return (
      <div className={'SignIn'}>
        <div className={'SignIn__form--wrapper'}>
          <div className={'SignIn__form'}>
            <Input
              type={'text'}
              placeholder={'Full Name'}
              onChange={(val) => this.onChange('name', val)}
              valid={nameValid}
            />
            <Input
              type={'email'}
              placeholder={'Email'}
              onChange={(val) => this.onChange('email', val)}
              valid={emailValid}
            />
            <Button text={'Start'} onClick={() => this.onClick()} type={'submit'}/>
          </div>
        </div>
        <div className={'SignIn__highscore--wrapper'}>
          <div className={'SignIn__highscore--chart'}>
            <div className={'SignIn__highscore--header'}>
              <h2>{'Top Players'}</h2>
            </div>
            {topTen.length ? this.renderTopTen() : this.renderEmpty()}
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state, props) {
  const { allPlayers, isFetching } = state.players;
  let topTen = Immutable.asMutable(allPlayers);
  topTen = topTen.filter(val => val.score !== 0).sort((a, b) => b.score - a.score).slice(0, 9);

  return { topTen, isFetching };
};

function mapDispatchToProps(dispatch) {
  return {
    newPlayer: bindActionCreators(playersActions.newPlayer, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
