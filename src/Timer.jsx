import React, { useState } from "react";
import { useCountdownTimer } from 'use-countdown-timer';

import UserInput from './UserInput.jsx'

const Timer = () => {
  const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
    timer: 1000 * 3662, // in ms
  });

  // let seconds = input * 1000 ;
  let seconds = countdown / 1000;

  function humanReadable(seconds) {
    // output: string in the format of 'HH:MM:SS'

    // if input is less than 0
    if (seconds < 0) { return 'Please enter a positive number of seconds.' }
    if (seconds > 359999) { return `The number of seconds entered has exceeded the counter's range of display (00:00:00 to 99:59:59)` }

    let
        SS = Math.floor(seconds % 60),
        MM = Math.floor(seconds / 60) % 60, // use modulo to get only the remainder minutes
        HH = Math.floor(seconds / 60 / 60);

    // return the format of 2 digits '00' to '59'
    const format = (time) => {
        return (time) > 9 ? time : String('0' + time);
    }

    SS = format(SS);
    MM = format(MM);
    HH = format(HH);

    return `${HH}:${MM}:${SS}`;
}


  return (
    <React.Fragment>
      <div>{humanReadable(seconds)}</div>
      <button onClick={reset}>Reset</button>
      {isRunning ? (
        <button onClick={pause}>Pause</button>
      ) : (
        <button onClick={start}>Start</button>
      )}
      <p>Notes: back-end needs from front-end to have a button to send a post reqeust.</p>
      <p>Label and Time value</p>
      <p></p>

      <UserInput/>
    </React.Fragment>
  );
}

export default Timer;