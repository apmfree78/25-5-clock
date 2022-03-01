import React from "react";

class App extends React.Component {
  state = {
    breakLength: 5, //break length in minutes
    sessionLength: 25, //session length in minutes
    isPlaying: false, //is clock on? boolean play => true, pause = false
    currentTime: "25:00", //current time in seconds
    mode: "Session", // OR 'Break' are we on break or in a session?
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
            <i class='fa fa-arrow-up fa-lg' id='break-increment' />
            <span id='break-length'>{breakLength}</span>
            <i class='fa fa-arrow-down fa-lg' id='break-decrement' />
          </div>
          <div className='length'>
            <h3 id='session-label'>Session Length</h3>
            <i class='fa fa-arrow-up fa-lg' id='session-increment' />
            <span id='session-length'>{sessionLength}</span>
            <i class='fa fa-arrow-down fa-lg' id='session-decrement' />
          </div>
        </div>
        <div id='timer'>
          <div id='timer-label'>{mode}</div>
          <div id='time-left'>{currentTime}</div>
        </div>
        <div id='controls'>
          <i id='start' className='fa fa-play fa-2x' />
          <i id='stop' className='fa fa-pause fa-2x' />
          <i id='reset' className='fa fa-refresh fa-2x' />
        </div>
      </div> /* id=clock */
    );
  }
}
export default App;
