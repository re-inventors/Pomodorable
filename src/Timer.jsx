import React, { useState } from "react";
import { useCountdownTimer } from 'use-countdown-timer';

import UserInput from './UserInput.jsx'
import './styles/styles.css';

const Timer = () => {
  // states
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(25);
  const [sec, setSec] = useState(0);
  const [timerLabel, setTimerLabel] = useState("let's go!");
  const [user, setUser] = useState('');
  const [timerList, setTimerList] = useState([]);

  const hourToMS = 60 * 60 * 1000;
  const minToMS = 60 * 1000;
  const secToMS = 1000;

  console.log(hour, min, sec);

  const duration = hour * hourToMS + min * minToMS + sec * secToMS;
  
  const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
    // timer sets the countdown
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

  const timerInput = () => {
    return (
      <form>
        <div id="notation">
          <input id="HH" name="HH_val" type="number" minLength="2" maxLength="2" value={hour} onChange={(e) => {setHour(e.target.value)}}/>:
          <input id="MM" name="MM_val" type="number" minLength="2" maxLength={2} value={min} onChange={(e) => {setMin(e.target.value)}}/>:
          <input id="SS" name="SS_val" type="number" minLength="2" value={sec} onChange={(e) => {setSec(e.target.value)}} />
        </div>
      </form>
    )
  };
  
  const timerDisplay = () => {
    return (<div id="notation">{humanReadable(seconds)}</div>)
  }

// reset / start buttons (later on maybe will remove the reset button)
// user input timer (later on we might merge with the timer display)
// save button: send data to the backend

  //preset timers list
  const list = [];
  for (let i = 0; i < timerList.length; i++){
    list.push()
  }

  return (
    <div id="container">
      {/* login */}
      <form>
        {/* if user is not logged in, login button appears. */}
        {/* if user is logged in, logout button appears. */}
        <input type="text" id='user' placeholder="Username" onChange={(e) => {setUser(e.target.value)}}/>
        <button type="button" id="loginButton" onClick={() => {
          // post request to send the data to the backend here
          fetch ('/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userName: user})
          }).then(res => res.json())
            .then(data => {

          });
        }}>
          Login
        </button>
        <br/>
        <br/>
        {/* input fields */}
        <input type="text" id='timer' placeholder="Custom Timer Name" value={timerLabel} onChange={(e) => { setTimerLabel(e.target.value) }} />
      </form>
      {/* countdown timer for user input */}
      <form>
        <div id="notation">
          <input id="HH" name="HH_val" type="number" minLength="2" maxLength="2" value={hour} onChange={(e) => {setHour(e.target.value)}}/>:
          <input id="MM" name="MM_val" type="number" minLength="2" maxLength={2} value={min} onChange={(e) => {setMin(e.target.value)}}/>:
          <input id="SS" name="SS_val" type="number" minLength="2" value={sec} onChange={(e) => {setSec(e.target.value)}} />
        </div>
      </form>
      {/* countdown timer for display  */}
      <div id="notation">{humanReadable(seconds)}</div>
        {/* {!isRunning ? timerInput() : timerDisplay()} */}
        <br/>
        <br />
        <button onClick={reset}>Reset</button>
        {isRunning ? (
          <button onClick={pause}>Pause</button>
        ) : (
          <button onClick={start}>Start</button>
      )}
      { () => {
        if (isRunning) { 
          return (<button onClick={pause}>Pause</button>);
        } else {
          return (<button onClick={start}>Start</button>);
        }
      }
      }
      <form>
        <label htmlFor="HH_i"> Hour: </label>
        <input type="number" id="HH_i" placeholder="HH" onChange={(e) => {setHour(e.target.value)}}/>
        <label htmlFor="MM_i"> Minute: </label>
        <input type="number" id="MM_i" placeholder="MM" maxLength={3} onChange={(e) => {setMin(e.target.value)}}/>
        <label htmlFor="SS_i"> Second: </label>
        <input type="number" id="SS_i" placeholder="SS" onChange={(e) => {setSec(e.target.value)}}/>
      </form>

      <button type="button" id="saveButton" onClick={() => {
        // post request to send the data to the backend here
        fetch ('/timer', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({label: timerLabel, dur: duration})
        }).then(res => res.json())
          .then(data => {
            setTimerList(data)
          });
      }}>Save</button>
    </div>
  );
}

export default Timer;