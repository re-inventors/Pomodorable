import React, { useState } from "react";
import { useCountdownTimer } from 'use-countdown-timer';

import UserInput from './UserInput.jsx'
import './styles/styles.css';

const Timer = () => {
  // state (dont mind me, just trying)
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(25);
  const [sec, setSec] = useState(0);
  const [timerLabel, setTimerLabel] = useState('Exotic Timer');
  console.log(timerLabel);

  const hourToMS = 60 * 60 * 1000;
  const minToMS = 60 * 1000;
  const secToMS = 1000;

  console.log(hour, min, sec);

  const duration = hour * hourToMS + min * minToMS + sec * secToMS;
  
  const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
    timer: duration, // in ms
  });

  console.log('duration ', countdown);

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

// timer display
// reset / start buttons (later on maybe will remove the reset button)
// user input timer (later on we might merge with the timer display)
// save button: send data to the backend

  return (
    <React.Fragment>
      <div>{humanReadable(seconds)}</div>
      <button onClick={reset}>Reset</button>
      {isRunning ? (
        <button onClick={pause}>Pause</button>
      ) : (
        <button onClick={start}>Start</button>
      )}

      <form className="inputStyling">
        <label htmlFor="timerLabel">Timer Label</label>
        <input type="text" id='timerLabel' placeHolder="Custom Timer Name" value={timerLabel} onChange={(e) => { setTimerLabel(e.target.value); console.log('label')}}/>
        <label htmlFor="HH_i">Hour:</label>
        <input type="number" id="HH_i" placeHolder="HH" onChange={(e) => {setHour(e.target.value); console.log('HH')}}/>
        <label htmlFor="MM_i">Minute:</label>
        <input type="number" id="MM_i" placeHolder="MM" maxLength={3} onChange={(e) => {setMin(e.target.value); console.log('MM' )}}/>
        <label htmlFor="SS_i">Second:</label>
        <input type="number" id="SS_i" placeHolder="SS" onChange={(e) => {setSec(e.target.value); console.log('SS' )}}/>
      </form>
      <button type="button" id="saveButton" onClick={() => {
        // post request to send the data to the backend here
        fetch ('/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({})
        }).then(res => res.json())
          .then(data => {

          });
      }}>Save</button>
    </React.Fragment>
  );
}

export default Timer;