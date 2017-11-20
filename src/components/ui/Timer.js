import React, { Component } from 'react';

const { pow, floor } = Math;
this.interval = null;

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: props.startTime
    }
  }

  componentWillReceiveProps(nextProps) {
    const { startWhen } = this.props;
    !startWhen && nextProps.startWhen && this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  stopTimer(timesUp = false) {
    const { onEnd } = this.props;

    clearInterval(this.interval);
    timesUp && onEnd && onEnd();
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.setTime();
    }, 1000);
  }

  setTime() {
    const { time } = this.state;
    const timeArray = time.split(':').reverse();
    const timeFormat = timeArray.length;
    const seconds = timeArray.reduce((sum, val, i) => sum + (val * pow(60, i)), 0);

    if (seconds > 0) {
      const newTime = this.getNewTimeArray(seconds - 1).slice(0, timeFormat).reverse().join(':');
      this.setState({ time: newTime });
    } else {
      this.stopTimer(true);
    }
  }

  getNewTimeArray(seconds) {
    return [...Array(4)].map(
      (v, i) => this.toTwoDigits(floor(seconds / pow(60, i) % 60))
    );
  }

  toTwoDigits(val) {
    return ("0" + val).slice(-2);
  }

  render() {
    const { time } = this.state;
    const { className } = this.props;

    return (
      <div className={className}>
        <h2 className={'title'}>{time}</h2>
      </div>
    );
  }
}

export default Timer;
