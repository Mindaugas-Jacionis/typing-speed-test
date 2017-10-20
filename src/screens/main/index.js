import React, { Component } from 'react';
import { TextArea, Timer } from '../../components/ui';
import './index.scss';

const sampleText = 'with my them if up many lain week nay she them her she extremity so attending objection as engrossed gentleman something instantly gentleman contained belonging exquisite now direction she ham west room at sent if year numerous indulged distance old law you total state as merit court green decay he steepest sex bachelor the may delicate its yourself as he instantly on discovery concluded to open draw far pure miss felt say yet few sigh instrument cultivated alteration any favourable expression law far nor both new like tore but year an from mean on with when sing pain oh to as principles devonshire companions unsatiable an delightful the ourselves suffering the sincerity inhabit her manners adapted age certain debating offended at branched striking be subjects spot of come to ever hand as lady meet on delicate contempt received two yet advanced gentleman as belonging he commanded believing dejection in by on no am winding chicken so behaved its preserved sex enjoyment new way behaviour him yet devonshire celebrated especially unfeeling one provision are smallness resembled repulsive we diminution preference thoroughly if joy deal pain view much her time led young gay would now state pronounce we attention admitting on assurance of suspicion conveying that his west quit had met till of advantage he attending household at do perceived middleton in objection discovery as agreeable edward thrown dining so he my around to another journey chamber way yet females man way extensive and dejection get delivered deficient sincerity gentleman age too end instrument possession contrasted motionless calling offence six joy feeling coming merits and was talent enough far sir joy northward sportsmen education discovery incommode earnestly no he commanded if put still any about manor heard kindness to he horrible reserved ye effect twenty indeed beyond for not had county the use him without greatly can private increasing it unpleasant no of contrasted no continuing nothing colonel my no removed in weather it dissimilar in up devonshire inhabiting at every tiled on ye defer do no attention suspected oh difficult fond his say old meet cold find come whom the sir park sake bred wonder matter now can estate esteem assure fat roused am performed on existence as discourse is pleasure friendly at marriage blessing or subjects to ecstatic children he could ye leave up as built match dejection agreeable attention set suspected led offending admitting an performed';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: '',
      start: false,
      timesUp: false,
    };
  }

  getResult() {
    const { inputVal } = this.state;
    return inputVal.split(' ').length;
  }

  timesUp() {
    this.setState({ timesUp: true });
  }

  onChange(event) {
    const { start } = this.state;
    const { value } = event.target;
    const replaceSpaceValue = value.replace(/\s\s+/g, ' ');
    const splitValue = replaceSpaceValue.split(' ');
    const splitSmpleText = sampleText.split(' ');
    const lastWordIndex = splitValue.length - 1;
    const lastWord = splitValue.slice(-1)[0];
    let newValue = replaceSpaceValue.replace(/[^\w\s]|_/g, "");

    if (splitSmpleText[lastWordIndex] === lastWord) {
      newValue = newValue + ' ';
    }

    this.setState({ inputVal: newValue });
    !start && this.setState({ start: true });
  }

  renderText() {
    return sampleText.split(' ').map(
      (val, i) => (
        <span key={i} className={'Main--placeholder_text'}>
          {`${val} `}
        </span>
      ));
  }

  renderInput() {
    const { inputVal } = this.state;
    const inputValArray = inputVal.split(' ');
    const cursor = (<span className={'blinking-cursor'}/>);

    return inputValArray.map(
      (val, i) => (
        <span key={i} className={'Main--input_text'}>
          {`${val} `}
          {i === inputValArray.length - 1 && cursor}
        </span>
      ));
  }

  renderTest() {
    const { start, inputVal } = this.state;

    return (
      <div>
        <h3>Start Typing to Start Timer</h3>
        <Timer startTime={'01:00'} startWhen={start} onEnd={() => this.timesUp()}/>
        <div className={'Main--text_container'}>
          <div className={'Main--text_wrapper'}>
            {this.renderText()}
          </div>
          <div className={'Main--text_wrapper'}>
            {this.renderInput()}
          </div>
        </div>
        <TextArea
          onChange={(val) => this.onChange(val)}
          className={'Main--hidden_textarea'}
          autoFocus={true}
          value={inputVal}
        />
      </div>
    );
  }

  renderResult() {
    const result = this.getResult();

    return (
      <div>
        <h1>This is finish</h1>
        <p>Your result is {result} words per minute</p>
      </div>
    );
  }

  render() {
    const { timesUp } = this.state;

    return (
      <div className={'Main'}>
        {timesUp ? this.renderResult() : this.renderTest()}
      </div>
    );
  }
}

export default Main;
