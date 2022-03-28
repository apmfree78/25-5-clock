import React from 'react';

//take seconds and returns mm:ss format as string
const displayTime = (seconds) =>
  `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

const Timer = ({ mode, children }) => {
  return (
    <div id='timer'>
      <div id='timer-label'>{mode}</div>
      <div id='time-left'>{displayTime(children)}</div>
    </div>
  );
};

export default Timer;
