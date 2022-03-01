import React from "react";
//setting initial states
const _break = 5;
const _session = 25;
const _playing = false;
const _current = 25 * 60;
const _mode = "Session";

//take seconds and returns mm:ss format as string
const displayTime = (seconds) =>
  `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

class App extends React.Component {
  state = {
    breakLength: _break, //break length in minutes
    sessionLength: _session, //session length in minutes
    isPlaying: _playing, //is clock on? boolean play => true, pause = false
    currentTime: _current, //current time in seconds
    mode: _mode, // OR 'Break' are we on break or in a session?
  };

  //setting empty function to use hold setInterval return value
  interval = () => {};

  //callback function for setInternal
  //function will be repeated each second
  //this function decrements currentTime by 1 and changes mode when
  //currentTime hits zero
  countDown = () => {
    const { breakLength, sessionLength } = this.state;
    let { currentTime, mode } = this.state;

    //reducing currentTime
    currentTime -= 1;

    // checking if current mode, break or session is complete
    if (currentTime < 0) {
      //switching mode and resetting currentTime to reflect mode change
      if (mode == "Session") {
        mode = "Break";
        currentTime = breakLength * 60;
      } else {
        mode = "Session";
        currentTime = sessionLength * 60;
      }
      //RING ALARM now that session has changed
      const alarm = new Audio("household_alarm_clock_beep_tone.mp3");

      //setting volume
      alarm.volume = 0.5;
      alarm.play();
    }

    //finally setting state
    this.setState({ currentTime, mode });
  };

  playTimer = () => {
    //checking timer is running
    if (!this.state.isPlaying) {
      //only starting play, if timer was stopped
      //set isPlaying to true
      this.setState({ isPlaying: true });

      //starting timer using CountDown method
      this.interval = setInterval(this.countDown, 1000);
    }
  };

  stopTimer = () => {
    //checking timer is running
    if (this.state.isPlaying) {
      //only stopping timer if it's running!!

      //set isPlaying to false
      this.setState({ isPlaying: false });

      //stop timer
      clearInterval(this.interval);
    }
  };

  // reset state to initial values
  refresh = () => {
    //if timer is running, stop it
    //set isPlaying to false
    if (this.state.isPlaying) {
      //only stopping timer if it's running!!

      //set isPlaying to false
      this.setState({ isPlaying: false });

      //stop timer
      clearInterval(this.interval);
    }
    this.setState({
      breakLength: _break, //break length in minutes
      sessionLength: _session, //session length in minutes
      isPlaying: _playing, //is clock on? boolean play => true, pause = false
      currentTime: _current, //current time in seconds
      mode: _mode, // OR 'Break' are we on break or in a session?
    });
  };

  setBreakLength = (length) => {
    // making sure new breakLength is within boundries
    //AND timer is not running
    let { mode, currentTime } = this.state;
    if (length <= 60 && length > 0 && !this.state.isPlaying) {
      const breakLength = length;
      if (mode == "Break") currentTime = breakLength * 60;
      this.setState({ currentTime, breakLength });
    }
  };
  setSessionLength = (length) => {
    // making sure new breakLength is within boundries
    //AND timer is not running
    let { mode, currentTime } = this.state;
    if (length <= 60 && length > 0 && !this.state.isPlaying) {
      const sessionLength = length;
      if (mode == "Session") currentTime = sessionLength * 60;
      this.setState({ currentTime, sessionLength });
    }
  };

  render() {
    const { breakLength, sessionLength, isPlaying, currentTime, mode } =
      this.state;

    return (
      <div id='clock'>
        <h1>25+5 Clock</h1>
        <div id='settings' className='d-flex justify-content-around'>
          <div className='length'>
            <h3 id='break-label'>Break Length</h3>
            <i
              className='fa fa-arrow-up fa-lg'
              id='break-increment'
              onClick={() => this.setBreakLength(breakLength + 1)}
            />
            <span id='break-length'>{breakLength}</span>
            <i
              className='fa fa-arrow-down fa-lg'
              id='break-decrement'
              onClick={() => this.setBreakLength(breakLength - 1)}
            />
          </div>
          <div className='length'>
            <h3 id='session-label'>Session Length</h3>
            <i
              className='fa fa-arrow-up fa-lg'
              id='session-increment'
              onClick={() => this.setSessionLength(sessionLength + 1)}
            />
            <span id='session-length'>{sessionLength}</span>
            <i
              className='fa fa-arrow-down fa-lg'
              id='session-decrement'
              onClick={() => this.setSessionLength(sessionLength - 1)}
            />
          </div>
        </div>
        <div id='timer'>
          <div id='timer-label'>{mode}</div>
          <div id='time-left'>{displayTime(currentTime)}</div>
        </div>
        <div id='controls'>
          <i id='start' className='fa fa-play fa-2x' onClick={this.playTimer} />
          <i id='stop' className='fa fa-pause fa-2x' onClick={this.stopTimer} />
          <i
            id='reset'
            className='fa fa-refresh fa-2x'
            onClick={this.refresh}
          />
        </div>
      </div> /* id=clock */
    );
  }
}
export default App;
