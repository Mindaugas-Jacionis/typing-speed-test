import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Button, Footer, ScoreBoard } from '../../components/ui';
import Immutable from 'seamless-immutable';
import * as playersActions from '../../reducers/players/actions';
import { emailRegex } from '../../Constants';
import './index.scss';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      study: '',
      year: '',
      emailValid: true,
      nameValid: true,
      studyValid: true,
      yearValid: true,
      scoreExpanded: false,
    };
  }

  validate() {
    const { email, name, study, year } = this.state;
    let isValid = true;

    if (!name || name.length < 2) {
      isValid = false;
      this.setState({ nameValid: false });
    }

    if (!emailRegex.test(email)) {
      isValid = false;
      this.setState({ emailValid: false });
    }

    if (!study || study.length < 2) {
      isValid = false;
      this.setState({ studyValid: false });
    }

    if (!year || year < 1) {
      isValid = false;
      this.setState({ yearValid: false });
    }

    return isValid;
  }

  onChange(key, event) {
    const { value } = event.target;
    const validityKey = `${key}Valid`;

    this.setState({
      [key]: value,
      [validityKey]: true,
    });
  }

  onClick() {
    const { email, name, study, year } = this.state;
    const { newPlayer } = this.props;
    const isValid = this.validate();

    if (isValid) {
      newPlayer({ name, email, study, year, score: 0 });
    }
  }

  toggleScoreBoard() {
    const { scoreExpanded } = this.state;
    this.setState({ scoreExpanded: !scoreExpanded });
  }

  render() {
    const {
      emailValid,
      nameValid,
      scoreExpanded,
      studyValid,
      yearValid,
    } = this.state;
    const { topPlayers, isFetching } = this.props;

    return (
      <div className={'SignIn'}>
        <ScoreBoard
          players={topPlayers}
          isFetching={isFetching}
          onExpand={() => this.toggleScoreBoard()}
          onClose={() => this.toggleScoreBoard()}
          expanded={scoreExpanded}
        />
        <div className={'SignIn__title-wrapper'}>
          <h1 className={'title'}>{'Take the challenge!'}</h1>
        </div>
        <div className={'SignIn__form--wrapper'}>
          <div className={'SignIn__form'}>
            <div>
              <Input
                type={'text'}
                placeholder={'Full Name'}
                onChange={val => this.onChange('name', val)}
                valid={nameValid}
              />
              <Input
                type={'email'}
                placeholder={'Email'}
                onChange={val => this.onChange('email', val)}
                valid={emailValid}
              />
            </div>
            <div>
              <Input
                type={'text'}
                placeholder={'Field of Study'}
                onChange={val => this.onChange('study', val)}
                valid={studyValid}
              />
              <Input
                type={'number'}
                placeholder={'Year of Study'}
                onChange={val => this.onChange('year', val)}
                valid={yearValid}
              />
            </div>
          </div>
          <div className="SignIn__form_submit">
            <p className="SignIn__form_terms">
              <span>
                By submiting I agree to receive job offers from Tesonet
              </span>
            </p>
            <Button
              text={'Start'}
              onClick={() => this.onClick()}
              type={'submit'}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { allPlayers, isFetching } = state.players;
  let topPlayers = Immutable.asMutable(allPlayers);
  topPlayers = topPlayers
    .filter(val => val.score !== 0)
    .sort((a, b) => b.score - a.score);

  return { topPlayers, isFetching };
}

function mapDispatchToProps(dispatch) {
  return {
    newPlayer: bindActionCreators(playersActions.newPlayer, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
