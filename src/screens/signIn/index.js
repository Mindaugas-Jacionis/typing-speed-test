import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Button } from '../../components/ui';
import * as signInActions from '../../reducers/signIn/actions';
import './index.scss';

class SignIn extends Component {
  onChange(val) {
    console.log(val);
  }

  onClick() {
    this.props.fakeSignIn();
  }

  render() {
    return (
      <div className={'SignIn'}>
        <div className={'SignIn--form'}>
          <Input type={'text'} placeholder={'Full Name'} onChange={(val) => this.onChange(val)}/>
          <Input type={'email'} placeholder={'Email'} onChange={(val) => this.onChange(val)}/>
          <Button text={'start'} onClick={() => this.onClick()} type={'submit'}/>
        </div>
        <div className={'highscore-chart'}>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fakeSignIn: bindActionCreators(signInActions.fakeSignIn, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(SignIn);
