import React, { useState, useEffect } from 'react';
import Settings from './Settings';
import Timer from './Timer';

//setting initial states
const _break = 5;
const _session = 25;
const _playing = false;
const _current = 25 * 60;
const _mode = 'Session';

const App = () => {
  /* state variables
    breakLength: _break, //break length in minutes
    sessionLength: _session, //session length in minutes
    isPlaying: _playing, //is clock on? boolean play => true, pause = false
    currentTime: _current, //current time in seconds
    mode: _mode, // OR 'Break' are we on break or in a session?
  }; */
  const [length, setLength] = useState({ break: _break, session: _session });
  const [isPlaying, setIsPlaying] = useState(_playing);
  const [currentTime, setTime] = useState(_current);
  const [mode, setMode] = useState(_mode);

  //callback function for setInternal
  //function will be repeated each second
  //this function decrements currentTime by 1 and changes mode when
  //currentTime hits zero
  const countDown = () => {
    let _currentTime = currentTime;
    let currentMode = mode;

    //reducing currentTime
    _currentTime -= 1;
    // console.log(`current time: ${_currentTime}`);

    // checking if current mode, break or session is complete
    if (_currentTime < 0) {
      //switching mode and resetting currentTime to reflect mode change
      if (currentMode == 'Session') {
        currentMode = 'Break';
        _currentTime = length.break * 60;
      } else {
        currentMode = 'Session';
        _currentTime = length.session * 60;
      }
      //RING ALARM now that session has changed
      const alarm = new Audio('household_alarm_clock_beep_tone.mp3');

      //setting volume
      alarm.volume = 0.5;
      alarm.play();
    }

    //finally setting state
    // this.setState({ currentTime, mode });
    setTime(_currentTime);
    setMode(currentMode);
  };

  //only starting play, if timer was stopped
  //set isPlaying to true
  const playTimer = () => !isPlaying && setIsPlaying(true);

  //stop timer if it's on
  const stopTimer = () => isPlaying && setIsPlaying(false);

  // reset state to initial values
  const refresh = () => {
    //if timer is running, stop it
    //set isPlaying to false
    if (isPlaying) setIsPlaying(false);

    //restate state to default values
    setLength({ break: _break, session: _session }); //break & session length in minutes
    setIsPlaying(_playing); //is clock on? boolean play => true, pause = false
    setTime(_current); //current time in seconds
    setMode(_mode); // OR 'Break' are we on break or in a session?
  };

  const changeLength = ({ breaklength, sessionlength }) => {
    // making sure new breakLength is within boundries
    //AND timer is not running
    let _currentTime = currentTime;
    let currentMode = mode;

    //make sure timer is paused
    if (!isPlaying) {
      //making sure new break or session length setting are
      //over 0 minutes and less than 60 minutes
      if (
        breaklength < 60 &&
        sessionlength < 60 &&
        breaklength > 0 &&
        sessionlength > 0
      ) {
        if (mode == 'Break') _currentTime = breaklength * 60;
        else if (mode == 'Session') _currentTime = sessionlength * 60;

        //setting state
        setLength({ break: breaklength, session: sessionlength });
        setTime(_currentTime);
      }
    }
  };

  //useEffect to setInterval and clearInterval for timer
  useEffect(() => {
    //itializing timer
    // console.log('useEffect instance');
    const interval = setInterval(countDown, 1000);

    //if timer is stopped , or never started
    //then clear interval
    if (!isPlaying) clearInterval(interval);

    //on unmount clear interval
    return () => clearInterval(interval);
  });

  return (
    <div id='clock'>
      <h1>25+5 Clock</h1>
      <div id='settings' className='d-flex justify-content-around'>
        <Settings length={length} changeLength={changeLength}>
          Break
        </Settings>
        <Settings length={length} changeLength={changeLength}>
          Session
        </Settings>
      </div>
      <Timer mode={mode}>{currentTime}</Timer>
      <div id='controls'>
        <i id='start' className='fa fa-play fa-2x' onClick={playTimer} />
        <i id='stop' className='fa fa-pause fa-2x' onClick={stopTimer} />
        <i id='reset' className='fa fa-refresh fa-2x' onClick={refresh} />
      </div>
    </div> /* id=clock */
  );
};

export default App;
