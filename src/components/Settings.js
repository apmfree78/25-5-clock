import React from 'react';

//component that shows Break Length and Session Length
//with up and down arrows to change the break and Session Length
const Settings = ({ length, changeLength, children }) => {
  const mode = children;

  //determine what setting to display
  const display = mode === 'Break' ? length.break : length.session;

  const changebyAmount = (amount) => {
    if (mode === 'Break') {
      return {
        breaklength: length.break + amount,
        sessionlength: length.session,
      };
    } else if (mode === 'Session') {
      return {
        breaklength: length.break,
        sessionlength: length.session + amount,
      };
    }
  };
  return (
    <>
      <div className='length'>
        <h3 id='{mode}-label'>{mode} Length</h3>
        <i
          className='fa fa-arrow-up fa-lg'
          id='{mode}-increment'
          onClick={() => changeLength(changebyAmount(1))}
        />
        <span id='{mode}-length'>{display}</span>
        <i
          className='fa fa-arrow-down fa-lg'
          id='{mode}-decrement'
          onClick={() => changeLength(changebyAmount(-1))}
        />
      </div>
    </>
  );
};

export default Settings;
